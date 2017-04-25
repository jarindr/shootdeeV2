var express = require('express')
var router = express.Router()

import * as booking from '../models/booking'

router.get('/login', function (req, res, next) {
  res.send('successfully login.')
})

router.post('/bookings/', function (req, res, next) {
  const { data } = req.body
  booking.insertBookingsAsync({
    data,
    onSuccess: result => {
      res.send(result)
    },
    onFailed: err => {
      res.send(err)
    }
  })
})
module.exports = router
