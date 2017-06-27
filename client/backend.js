import store from './store'
import * as equipmentActions from './actions/equipmentActions'
import * as jobInfoUnfinishedActions from './actions/jobInfoUnfinishedActions'
import _ from 'lodash'
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
  const topics = ['equipments:get', 'booking:get:id']
  for (const topic of topics) {
    socket.emit(topic)
  }
}

function handleBackendRecieved (socket) {
  const topics = {
    'equipments:get': (data) => {
      store.dispatch(equipmentActions.getAllEquipmentsAction(data))
    },
    'booking:get:id': (data) => {
      store.dispatch(jobInfoUnfinishedActions.bookingIdRecievedFromBackend(data))
    }
  }
  // loop and create socket event handler
  _.forOwn(topics, (callback, topic) => {
    socket.on(topic, callback)
  })
}
