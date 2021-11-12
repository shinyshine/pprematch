const path = require('path');


/**
 * 
 * @typedef {import("webpack").Configuration} WebpackConfig
 * @type {WebpackConfig}
 */

module.exports = {
    mode: 'development',
    entry: './app.jsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },

    devServer: {
        port: 3000
    }

}