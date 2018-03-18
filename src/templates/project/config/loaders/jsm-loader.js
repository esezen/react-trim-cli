function getClassName(content) {
	const match = content.match(/class\s+\w+\s*/);

	return match[0].replace(/class\s+/, '').trim();
}

function cleanCase(_case) {
	return _case.replace(/\(state\,{0,1}(.*?)\)\s*\{/, '');
}

function getCases(content) {
	const match = content.match(/\w+\(state\,{0,1}(.*?)\)\s*\{/g);
	return match !== null ? match.map(function(_case) {
		return cleanCase(_case);
	}) : null;
}

function casesToJson(cases, className) {
	if(cases !== null) {
		const objCases = cases.map(function(_case) {
			return `${_case.toUpperCase()}: "${className.toUpperCase()}-${_case.toUpperCase()}"`;
		});

		return `{${ objCases.join(',') }}`;
	} else {
		return '{}';
	}
}

function casesToReducer(cases, className) {
	if(cases !== null) {
		const callCases = cases.map(function(_case) {
			return `case CASES.${_case.toUpperCase()}: return ${className}.${_case}(state, payload);`;
		});

		return callCases.join('');
	} else {
		return '';
	}
}

function casesToDispatch(cases) {
	if(cases !== null) {
		const casesDispatch = cases.map(function(_case) {
			return `export const ${_case}Dispatch = payload => ({ type: CASES.${_case.toUpperCase()}, payload });`;
		});

		return casesDispatch.join('');
	} else {
		return '';
	}
}

function renameClass(content) {
	return content.replace(/class\s+\w+\s*/, function(classDef) {
		return `export ${classDef.trim()}Definition`;
	});
}

module.exports = function(content) {
	var
		className = getClassName(content),
		cases = getCases(content)
	;

	var
		casesObj = casesToJson(cases, className),
		casesCall = casesToReducer(cases, className),
		casesDispatch = casesToDispatch(cases),
		renamedClass = renameClass(content),
		newClassName = `${className}Definition`
	;

return (`
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import Thunk from 'redux-thunk'
${ renamedClass }
export const CASES = ${casesObj}
export const ${className} = new ${newClassName}()
const State = typeof ${className}.state === 'object' ? ${className}.state : ${className}.state()
const Reducer = (state = State, { type, payload }) => {
	switch(type) {
		${casesCall}
		default: return state
	}
}
${casesDispatch}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(Thunk));
export default createStore(Reducer,State,middleware);
`);
};
