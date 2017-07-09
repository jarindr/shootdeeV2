const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonLoaders = require('./commonLoaders')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, '../client/index.js')
  ],

  output: {
    path: path.resolve(__dirname, '../server/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 9000,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
      }
    }
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } })
  ]
}
