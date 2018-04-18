/*
 | --------------------------------------------------------
 | Resolve Configurations for Webpack
 | --------------------------------------------------------
 | react-trim uses `react-app-rewired` to stilly modify
 | the webpack.config for both prod and dev without having
 | to eject your project. You can either use your custom
 | modifications by creating a new file and pointing
 | the `--config-overrides` flag in your script property
 | located in the `package.json` file to your new file.
 |
 | You can also customize react-trim's webpack config
 | further as show below.
 |
 */
module.exports = {
    /**
     * Resolve Folder Paths when Importing
     * @param  {Function} resolveApp takes a path string and resolves
     *                               it to the application root
     * @return {Array}               Returns an array of paths
     */
    modules(resolveApp) {
        return [
            resolveApp('src'),
            resolveApp('src/containers'),
            resolveApp('src/resources'),
            resolveApp('node_modules'),
        ];
    },

    /**
     * Reslve File extensions when importing
     * @return {Array} Returns an array of exensions.
     */
    extensions() {
        return [
            '.jsc',
            '.jsm',
            '.jsv',
            '.mcss',
            '.mscss',
            '.css',
            '.scss',
        ];
    },
}
