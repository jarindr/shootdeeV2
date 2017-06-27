let io = null
import log4js from 'log4js'
const logger = log4js.getLogger()
import * as EquipmentsModel from './models/equipments'
import * as BookingsModel from './models/booking'
import _ from 'lodash'
export function initSocketHandler (server) {
  io = require('socket.io')(server)

  io.on('connection', function (socket) {
    logger.info(socket.id, 'a socket has connected')
    handleTopicRecieved(socket, io)
  })
}

function handleTopicRecieved (socket, io) {
  const topics = {
    'equipments:get': () => {
      EquipmentsModel.getAllEquipmentsAsync({
        onSuccess: (data) => {
          io.emit('equipments:get', { data })
        }
      })
    },
    'booking:get:id': () => {
      BookingsModel.getBookingIdAsync({
        onSuccess: (data) => {
          io.emit('booking:get:id', data)
        }
      })
    },
    'booking:save': (data) => {
      BookingsModel.saveBookingsAsync({
        data,
        onSuccess: (response) => {
          console.log(response)
        },
        onFailed: (response) => {
          console.log(response)
        }
      })
    }
  }
  _.forOwn(topics, (callback, topic) => {
    socket.on(topic, callback)
  })
}
