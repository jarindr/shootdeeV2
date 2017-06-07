module.exports = [
  {
    test: /\.jsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [['env', { 'modules': false }], 'react'],
          plugins: [
            'babel-plugin-transform-class-properties',
            ['import', {
              'libraryName': 'antd',
              'style': true
            }],
            'transform-object-rest-spread',
            'react-hot-loader/babel']

        }
      }
    ],
    exclude: /node_modules/
  },
  {
    test: /\.sass$/,
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[name]-[local]-[hash:base64]'
      }
    },
    {
      loader: 'postcss-loader'
    }, {
      loader: 'sass-loader'
    }]
  },
  {
    test: /\.less$/,
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader'
    }, {
      loader: 'less-loader',
      options: {
        modifyVars: require('../client/misc/theme.js')
      }
    }]
  },
  { test: /(\.css$)/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] },
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
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  }

]
