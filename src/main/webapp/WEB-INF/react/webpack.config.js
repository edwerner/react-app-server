var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
// var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
// var webpack_isomorphic_tools_plugin = 
//   // webpack-isomorphic-tools settings reside in a separate .js file  
//   // (because they will be used in the web server code too). 
//   new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
//   // also enter development mode since it's a development webpack configuration 
//   // (see below for explanation) 
//   .development()

module.exports = [{
  entry: './source/javascripts/router.js',
  output: { 
    path: __dirname,
    filename: '../../resources/js/[name].js',
  },
  node: {
    fs: 'empty'
  },
  target: 'web',
  externals: [nodeExternals()],
  mode: 'development',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets : ["@babel/preset-env"],
          plugins: [
            'react-hot-loader/babel',
            'transform-object-rest-spread',
            '@babel/plugin-proposal-class-properties'
          ]
        }
      },
      { 
        test: /\.node$/,
        loader: "node-loader" 
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      },      {
        test: /\LICENSE$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    new webpack.DefinePlugin({
      "process.env": { 
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
      }
    }),
    new ExtractTextPlugin('../../resources/css/app.css', {
      allChunks: true
    })
  ],
  resolve: {
    extensions: [".json", ".node", ".js"]
  }
}];