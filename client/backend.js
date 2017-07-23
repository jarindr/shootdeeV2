import * as equipmentActions from './actions/equipmentActions'
import * as jobActions from './actions/jobActions'
import * as bookingActions from './actions/bookingAction'
import * as jobUnfinishedActions from './actions/jobUnfinishedActions'
import * as appActions from './actions/appActions'
import _ from 'lodash'
import store from './store'

let socket = null

export function initSocketConnection ({ onConntected }) {
  socket = require('socket.io-client')('http://localhost:3000')
  socket.on('connect', function () {
    onConntected()
    handleBackendRecieved(socket)
    getStarter(socket)
  })
}

export function publish (topic, data) {
  socket.emit(topic, data)
}

function getStarter (socket) {
  socket.emit('starter:get')
}

function handleBackendRecieved (socket) {
  const topics = {
    'equipments:get': (data) => {
      store.dispatch(equipmentActions.getAllEquipmentsAction(data))
    },
    'job:get:id': (data) => {
      store.dispatch(jobUnfinishedActions.jobIdRecievedFromBackend(data))
    },
    'job:get:all': (data) => {      
      store.dispatch(jobActions.jobsRecievedFromBackend(data))
    },
    'booking:get:all': (data) => {
      store.dispatch(bookingActions.bookingsRecievedFromBackend(data))
    },
    'starter:get': (data) => {
      store.dispatch(appActions.starterRecievedFromBackend(data))
    }
  }
  // loop and create socket event handler
  _.forOwn(topics, (callback, topic) => {
    socket.on(topic, callback)
  })
}
