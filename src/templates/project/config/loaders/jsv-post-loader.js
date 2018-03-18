module.exports = function(content) {
	return content.replace(/import\sCSS_XXX_\d\sfrom/g, 'import');
};
