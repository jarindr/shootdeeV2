import store from './store'
import * as equipmentActions from './actions/equipmentActions'
import _ from 'lodash'
export function initSocketConnection ({ onConntected }) {
  const socket = require('socket.io-client')('http://localhost:3000')
  socket.on('connect', function () {
    onConntected()
    handleBackendRecieved(socket)
    getStarter(socket)
  })
}

function getStarter (socket) {
  const topics = ['equipments:get']
  for (const topic of topics) {
    socket.emit(topic)
  }
}

function handleBackendRecieved (socket) {
  const topics = {
    'equipments:get': (data) => {
      store.dispatch(equipmentActions.getAllEquipmentsAction(data))
    }
  }
  // loop and create socket event handler
  _.forOwn(topics, (callback, topic) => {
    socket.on(topic, callback)
  })
}
