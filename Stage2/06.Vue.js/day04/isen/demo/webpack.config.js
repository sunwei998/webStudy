const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ? 入口文件
  entry: './src/index.js',
  output: {
		// * 导出的文件名
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: '8088', // 设置端口号为8088
    hot: true, // 启动服务器后直接打开页面
    open: true, // 热更新
  },
  module:{
    rules:[
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: [
              'style-loader', 
              'css-loader',
              {
                loader: 'postcss-loader'
              }
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        },
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  mode:"development",
  plugins:[
    new HtmlWebpackPlugin({
			template: './dist/index.html',
		}),
    new webpack.HotModuleReplacementPlugin()
  ]
};