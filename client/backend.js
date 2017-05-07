import {store} from './index'
import * as bookingsActions from './actions/bookingsActions.js'
export function initSocketConnection ({onConntected}) {
  const socket = require('socket.io-client')('http://localhost:3000')
  socket.on('connect', function () {
    getInitialStoreData()
    onConntected()
  })
  socket.on('topic:post:booking', function (data) {
  })
  socket.on('disconnect', function () {
  })
}

function getInitialStoreData () {
  store.dispatch(bookingsActions.getAllBookings())
}
