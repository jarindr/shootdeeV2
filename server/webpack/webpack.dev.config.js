const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonLoaders = require('./commonLoaders')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../../client/index.js')
  ],

  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      ...commonLoaders
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({template: path.resolve(__dirname, '../public/index.html')}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
