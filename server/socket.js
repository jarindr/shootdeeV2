import * as EquipmentsModel from './models/equipments'
import * as jobModel from './models/job'

import _ from 'lodash'
import log4js from 'log4js'

const logger = log4js.getLogger()
export function initSocketHandler (server) {
  const io = require('socket.io')(server)
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
    'job:get:id': () => {
      jobModel.getJobIdAsync({
        onSuccess: (data) => {
          io.emit('job:get:id', data)
        }
      })
    },
    'job:save': ({job, bookingUnfinished}) => {
      const bookings = _.values(bookingUnfinished).map((booking, index) => {
        return Object.assign({}, booking, {id: `${job.id}-${index}`})
      })
      jobModel.saveJobAsync({
        job,
        bookingUnfinished: bookings,
        onSuccess: (response) => {
          io.emit('job:save', response)
        },
        onFailed: (response) => {
        }
      })
    }
  }
  _.forOwn(topics, (callback, topic) => {
    socket.on(topic, callback)
  })
}
