'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: {
        main:__dirname + '/app.js',
        vendor: ['react', 'redux', 'react-redux', 'react-dom'] // 这里是依赖的库文件配置，和CommonsChunkPlugin配合使用可以单独打包
    }, //唯一入口文件
    output: {
        path: __dirname + '/build', //打包后的文件存放位置
        filename:'[name].js?hash=[hash]',
        // 添加 chunkFilename
        chunkFilename:'[name].chunk.js?hash=[hash]',
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
        ]
    },
    devServer: {
        port: 8888, // 端口号
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        disableHostCheck:true, // 允许通过ip访问
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
            __DEV__:false,
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js' // 公共文件出口
        })
    ]
}