var express = require('express')
var router = express.Router()
var path = require('path')

router.get('*', function (req, res) {
  res.s(path.resolve(__dirname, 'public/index.html'))
})

module.exports = router
