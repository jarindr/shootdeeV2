const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonLoaders = require('./commonLoaders')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: [
    path.resolve(__dirname, '../client/index.js')
  ],

  output: {
    path: path.resolve(__dirname, '../server/public'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      ...commonLoaders
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.resolve(__dirname, './index.html')}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } })
  ]
}
