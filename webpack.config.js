var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Specify vendor dependencies
const VENDOR_LIBS = [
  'faker', 'lodash', 'react', 'react-dom',
  'react-input-range', 'react-redux', 'react-router',
  'redux', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    // Specify second bundle file
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // Use name from entry plus chunkhash
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [

      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    // Eliminate duplicate code in bundles
    new webpack.optimize.CommonsChunkPlugin({
      //
      names: ['vendor', 'manifest']
    }),
    // Handle script tags for bundle files
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // Added for deployment - window scoped variable
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
