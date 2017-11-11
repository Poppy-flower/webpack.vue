/**
 * Created by mahenan on 2017/10/20.
 */
// nodejs 中的path模块

var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require("glob")

var entry={};
var pluginsArr=[];
var arr=[new ExtractTextPlugin("[name].[contenthash].css")];
var pathList=glob.sync('src' + '/*/*.js');
pathList.map(function (item) {
    var exec=/([^<>/\\\|:""\*\?]+)\.\w+$/.exec(item);
    var name=exec[1];
    pluginsArr.push(name);
    entry[name]=path.resolve(__dirname, item);
});
pluginsArr.map(function (item) {
    arr.push(new HtmlWebpackPlugin({
        title: 'My App',
        filename: item+'.html',
        chunks:[item],
        template:path.resolve(__dirname, 'src/index/index.html')
        // hash:true
    }));
});
console.log('entry-->', entry)
console.log(pluginsArr);
module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: entry,
    // 输出配置
    output: {
        // 输出路径是 mahenan/output/static
        path: path.resolve(__dirname, 'output/static/'),
        // path: 'output/static/[name]/',
        publicPath: '',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].js'
    },
    resolve: {
        extensions: ['.css','.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.es6$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
                //loader:'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                // 单独抽离出css
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
                // 使用style-loader和css-loader将其加载到js中
                // use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.jpg|\.png|\.jpeg/,
                use: 'url-loader'
            }
        ]
    },

    plugins: arr
};
