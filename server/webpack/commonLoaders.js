module.exports = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'react']
    }
  },
  {
    test: /\.placeholder\.(jpg|png)$/,
    loader: 'url-loader?name=assets/images/[hash].[ext]&limit=4096'
  },
  {
    test: /\.(svg|png)(\?.*)?$/,
    exclude: /\.placeholder\.(jpg|png)$/,
    loader: 'url-loader?name=assets/images/[hash].[ext]&limit=4096'
  },

  {
    test: /\.jpg$/,
    exclude: /\.placeholder\.(jpg|png)$/,
    loader: 'file-loader?name=assets/images/[hash].[ext]'
  },
  {
    test: /\.gif$/,
    exclude: /\.placeholder\.(gif)$/,
    loader: 'file-loader?name=assets/images/[hash].[ext]'
  },
  {
    test: /\.pdf$/,
    exclude: /\.placeholder\.(pdf)$/,
    loader: 'file-loader?name=[hash].[ext]'
  },
  {
    test: /\.eps$/,
    exclude: /\.placeholder\.(jpg|png)$/,
    loader: 'file-loader?name=assets/images/[hash].[ext]'
  },
  {
    test: /\.(eot|woff2|woff|ttf|otf|)(\?.*)?$/,
    loader: 'file-loader?name=assets/fonts/[hash].[ext]'
  }

]
