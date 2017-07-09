import * as equipmentActions from './actions/equipmentActions'
import * as jobActions from './actions/jobActions'
import * as jobUnfinishedActions from './actions/jobUnfinishedActions'
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
  const topics = ['equipments:get', 'job:get:id', 'job:get:all']
  for (const topic of topics) {
    socket.emit(topic)
  }
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
    }
  }
  // loop and create socket event handler
  _.forOwn(topics, (callback, topic) => {
    socket.on(topic, callback)
  })
}
