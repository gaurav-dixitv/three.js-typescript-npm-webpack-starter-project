var webpack = require('webpack');
var path = require('path');
var GitRevisionPlugin = require('git-revision-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'src/main.ts')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'three_boilerplate.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            three: path.join(__dirname, 'node_modules/three/build/three.js'),
            assets: path.join(__dirname, 'assets/')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'DEBUG': true,
            'GIT_REVISION': JSON.stringify(new GitRevisionPlugin().commithash())
        }),
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new HtmlWebpackPlugin({
            title: 'threejs_boilerplate (dev build)',
            template: path.join(__dirname, 'templates/index.ejs')
        }),
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' },
            { from: 'css', to: 'css' }
        ])
    ],
    devServer: {
        contentBase: [path.join(__dirname, 'dist')],
        compress: true,
        port: 9000,
        inline: true,
        overlay: {
            warnings: true,
            errors: true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/
        }
    },
    module: {
        rules: [
            { test: /assets(\/|\\)/, loader: 'file-loader?name=assets/[hash].[ext]' },
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' },
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}