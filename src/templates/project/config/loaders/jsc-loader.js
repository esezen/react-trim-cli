function getProps(content) {
	const match = content.match(/\@Props\s*\{((.|\n)*?)\}/g)

	return match !== null ? match[0] : null;
}

function parseProps(props) {
	return props.replace(/\@Props\s*\{/, '{');
}

function getActions(content) {
	const match = content.match(/\@Actions\s*\{((.|\n)*?)\}/g)

	return match !== null ? match[0] : null;
}

function parseActions(actions) {
	return actions.replace(/\@Actions\s*\{/, '{');
}

function extendReact(content) {
	return content.replace(/class\s+\w+\s*/, function(match) {
		return `${match.trim()} extends React.Component`
	})
}

function getClassName(content) {
	const match = content.match(/class\s+\w+\s*/);

	return match[0].replace(/class\s+/, '').trim();
}

function parseModel(model) {
	return model !== null ? model.replace(/\@Model\s*['"]/, '').replace(/[\'|\"]/, '') : null;
}

function getModel(content, className) {
	const match = content.match(/\@Model\s*['"](.*?)['"]/g);
	return match !== null ? match[0] : null;
}

function parseView(view) {
	if(view !== null) {
		clean = view.replace(/\@View\s*['"]/, '').replace(/[\'|\"]/, '');
		return `import View from '${clean}'`;
	} else {
		return '';
	}
}

function getView(content, className) {
	const match = content.match(/\@View\s*['"](.*?)['"]/g)

	return match !== null ? match[0] : null;
}

function parseDispatch(actions, model) {
	if(model !== null) {
		const actionArray = actions.split(',');
		const dispatchArray = actionArray.map(function(action) {
			const cleanAction = action.replace(/[\{|\}]/g, '').trim();

			return `${cleanAction}Dispatch as ${cleanAction}`
		});

		return `import store, {${ dispatchArray.join(',') }} from '${model}'`;
	} else {
		return '';
	}
}

module.exports = function(content) {
	var
		className = getClassName(content),
		cleanContent = extendReact(content),
		model = null,
		view = null,
		parsedView = '',
		parsedModel = '',
		props = null,
		parsedProps = 'state',
		actions = null,
		parsedActions = '{}',
		parsedDispatch = null,
		connect = '',
		bindActionCreators = '',
		notNull = false
	;

	props = getProps(content);
	if(props !== null) {
		parsedProps = parseProps(props);
		cleanContent = cleanContent.replace(props, '');
	}

	view = getView(content, className)
	if(view !== null) {
		parsedView = parseView(view);
		cleanContent = cleanContent.replace(view, '');
	}

	model = getModel(content, className);
	parsedModel = parseModel(model);
	if(model !== null) {
		cleanContent = cleanContent.replace(model, '');
	}

	actions = getActions(content);
	notNull = actions !== null
	if(notNull) {
		parsedActions = parseActions(actions);
		parsedDispatch = parseDispatch(parsedActions, parsedModel);
		cleanContent = cleanContent.replace(actions, '');
	}

	connect = notNull ? `const mapDispatchToProps = dispatch => bindActionCreators(${parsedActions}, dispatch)
	const ${className}Wrapper = connect(mapStateToProps,mapDispatchToProps)(${className})` : `const ${className}Wrapper = connect(mapStateToProps)(${className})`
	bindActionCreators = notNull ? "import { bindActionCreators } from 'redux'" : ''

	if(parsedModel === null) {
return (`
import React from 'react'
${parsedView}
${ cleanContent }
export default ${className}
`);
	}

	if(parsedDispatch === null) {
		parsedDispatch = `import store from '${parsedModel}'`;
	}

return (`
import React from 'react'
import { connect, Provider } from 'react-redux'
${parsedView}
${bindActionCreators}
${parsedDispatch}
${ cleanContent }
const mapStateToProps = (${parsedProps}) => (${parsedProps})
${connect}
export default () => <Provider store={ store }><${className}Wrapper /></Provider>
`);
};
