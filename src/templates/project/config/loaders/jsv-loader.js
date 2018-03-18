module.exports = function(content) {
	var css = 0;
	var newContent = content.replace(/rt-import(.*?)default\=['"](.*?)['"]/g, function(pacakge) {
		return pacakge.replace(/default\=/, 'as=')
	}).replace(/rt-import(.*?)component\=['"](.*?)['"]/g, function(component) {
		return component.replace(/component\=/, 'name=')
	}).replace(/\<rt\-import\s*(?!name\=)\w+\=['"].*['"]\s*(?!name\=)\w+\=['"].*['"]\s*(?!name\=)\s*\/\>/g, function(tag) {
		return tag.replace('rt-import', 'rt-import name="default"');
	}).replace(/\<rt\-load.*\/\>/g, function(tag) {
		return tag.replace('rt-load', `rt-import name="default" as="CSS_XXX_${ css++ }" `);
	}).replace(/\w+\s*\/\s*\([\w|\,|\s]+\)/g, function(diff) {
		var args = diff.split('/');
		var set  = args[0].trim();
		var subset = args[1].trim().replace(/\(/, '[').replace(/\)/, ']').replace(/[\w|\,|\s]+/, function(s) {
			var atoms = s.split(',');
			var quoted = atoms.map(function(atom) {
				return `'${atom}'`;
			});

			return quoted.join(',');
		});

		return `_.omit(${set}, ${subset})`;
	}).replace(/\{([^\}]*)if([^\}]*)\}/g, function(match) {
		var args = match.split('if');
		return `{${args[1].substr(0, args[1].length - 1).trim()} ? ${args[0].substr(1).trim()} : null}`;
	}).replace(/on\w+\=["'].+?["']/g, function(on) {
		return on.replace(/[\"|\'].*[\"|\']/, function(quotes) {
			var singleQuotes = quotes.replace(/\"/g, "'");
			return `"{${singleQuotes}}"`;
		});
	}).replace(/rt\-for/g, 'rt-repeat').replace(/rt\-(?:if|repeat|scope|props)\=\{(.*?)(?!\}\`|\}\}|\}\))\}/g, function(braces) {
		return braces.replace(/\{/, '"').replace(/(?!\}\`|\}\}|\}\))\}/, '"');
	}).replace(/\=\{((.|\n)*?)(?!\}\`|\}\}|\}\))\}/g, function(braces) {
		var bracesSingleQuote = braces.replace(/\"/g, "'").replace(/\s+/g, ' ').substr(1);

		return `="${ bracesSingleQuote }"`;
	});

	return newContent;
};


