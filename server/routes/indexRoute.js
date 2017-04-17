var express = require('express')
var router = express.Router()
const path = require('path')
router.get('*', function (req, res, next) {
  try {
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
  } catch (e) {
    console.log('error sending html file', e)
    res.send(e)
  }
})
module.exports = router
