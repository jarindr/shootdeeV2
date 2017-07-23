import * as EquipmentsModel from './models/equipments'
import * as jobModel from './models/job'
import * as bookingModel from './models/booking'
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
    'starter:get': () => {
      bookingModel.getAll({
        onSuccess: (data) => {
          socket.emit('booking:get:all', data)
          EquipmentsModel.getAllEquipments({
            onSuccess: (data) => {
              socket.emit('equipments:get', { data })
              jobModel.getJobId({
                onSuccess: (data) => {
                  socket.emit('job:get:id', data)
                  jobModel.getAll({
                    onSuccess: (data) => {
                      socket.emit('job:get:all', data)
                      socket.emit('starter:get', true)
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    'equipments:get': () => {
      EquipmentsModel.getAllEquipments({
        onSuccess: (data) => {
          socket.emit('equipments:get', { data })
        }
      })
    },
    'booking:get:all': () => {
      bookingModel.getAll({
        onSuccess: (data) => {
          socket.emit('booking:get:all', data)
        }
      })
    },
    'job:get:all': () => {
      jobModel.getAll({
        onSuccess: (data) => {
          socket.emit('job:get:all', data)
        }
      })
    },
    'job:get:id': () => {
      jobModel.getJobId({
        onSuccess: (data) => {
          socket.emit('job:get:id', data)
        }
      })
    },
    'job:save': ({ jobUnfinished, bookingUnfinished }) => {
      const bookingsData = _.values(bookingUnfinished).map((booking, index) => {
        return Object.assign({}, booking, { id: `${jobUnfinished.id}-${index}` })
      })
      const jobData = Object.assign({}, jobUnfinished, { bookings: bookingsData.map(x => x.id) })
      jobModel.saveJob({
        job: jobData,
        bookingUnfinished: bookingsData,
        onSuccess: (response) => {
          socket.emit('job:save', response)
          bookingModel.getAll({
            onSuccess: (data) => {
              io.emit('booking:get:all', data)
            }
          })
          jobModel.getAll({
            onSuccess: (data) => {
              io.emit('job:get:all', data)
            }
          })
          jobModel.getJobId({
            onSuccess: (data) => {
              socket.emit('job:get:id', data)
            }
          })
        }
      })
    }
  }
  _.forOwn(topics, (callback, topic) => {
    socket.on(topic, callback)
  })
}
