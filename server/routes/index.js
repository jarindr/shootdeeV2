var express = require('express')
var router = express.Router()
var path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.dev.config.js')
router.get('*', function (req, res, next) {
  const compiler = webpack(webpackConfig)
  const filename = path.resolve(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, function (err, result) {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

module.exports = router
