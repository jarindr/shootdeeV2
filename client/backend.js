import { store } from './index'
import * as equipmentActions from './actions/equipmentActions'
import _ from 'lodash'
export function initSocketConnection ({onConntected}) {
  const socket = require('socket.io-client')('http://localhost:3000')
  socket.on('connect', function () {
    onConntected()
    handleBackendRecieved(socket)
    socket.emit('get:equipments')
    socket.on('get:equipments', (data) => {
      console.log('yooo')
    })
  })
}
function handleBackendRecieved (socket) {
  const topics = {
    'get:equipments': (data) => {
      store.dispatch(equipmentActions.getEquipmentsAction(data))
    }
  }
  // loop and create socket event handler
  _.forOwn(topics, (callback, topic) => {
    socket.on(topic, callback)
  })
}
