var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = [{
  entry: './source/javascripts/router.js',
  output: { 
    path: __dirname,
    filename: '../../resources/js/[name].js',
  },
  target: 'web',
  mode: 'development',
  node: {
    module: 'empty'
  },
  module: {
  unknownContextCritical : false,
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
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
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
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
      new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    extensions: [".jsx", ".json", ".node", ".js", ".scss", ".css"]
  }
}];