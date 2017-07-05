var express = require('express')
var router = express.Router()

import * as booking from '../models/booking'

router.get('/login', function (req, res, next) {
  res.send('successfully login.')
})

router.get('/bookings/:id', function (req, res, next) {
  if (req.params.id === 'all') {
    booking.getAllBookings({
      onSuccess: result => {
        res.send(result)
      },
      onFailed: err => {
        res.send(err)
      }
    })
  } else {
    booking.getBookings({
      onSuccess: result => {
        res.send(result)
      },
      onFailed: err => {
        res.send(err)
      }
    })
  }
})

router.post('/bookings/', function (req, res, next) {
  const { data } = req.body
  booking.saveBookings({
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
