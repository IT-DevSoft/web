const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.m?(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'www/index.html',
            favicon: "www/favicon.ico"
        })
    ],
    devServer: {
        historyApiFallback: true,
        compress: true,
        port: 9000,
    },
};