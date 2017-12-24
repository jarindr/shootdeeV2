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
    'starter:get': async () => {
      const bookings = await bookingModel.getAll()
      const equipments = await EquipmentsModel.getAllEquipments()
      const jobId = await jobModel.getJobId()
      const jobs = await jobModel.getAll()
      socket.emit('booking:get:all', bookings)
      socket.emit('equipments:get', equipments)
      socket.emit('job:get:id', jobId)
      socket.emit('job:get:all', jobs)
      socket.emit('starter:get', true)
    },
    'equipments:get': async () => {
      const data = await EquipmentsModel.getAllEquipments()
      socket.emit('equipments:get', data)
    },
    'booking:get:all': async () => {
      const bookings = await bookingModel.getAll()
      socket.emit('booking:get:all', bookings)
    },
    'job:get:all': async () => {
      const jobs = await jobModel.getAll()
      socket.emit('job:get:all', jobs)
    },
    'job:get:id': async () => {
      const id = await jobModel.getJobId()
      socket.emit('job:get:id', id)
    },
    'job:edit:save': async ({ job, bookings }) => {
      await jobModel.saveEditJob({ job, bookings })
      const updateBookings = await bookingModel.getAll()
      const jobId = await jobModel.getJobId()
      const jobs = await jobModel.getAll()
      io.emit('booking:get:all', updateBookings)
      io.emit('job:get:id', jobId)
      io.emit('job:get:all', jobs)
    },
    'job:save': async ({ jobUnfinished, bookingUnfinished }) => {
      await jobModel.saveJob({ job: jobUnfinished, bookingUnfinished: bookingUnfinished })
      const updateBookings = await bookingModel.getAll()
      const jobId = await jobModel.getJobId()
      const jobs = await jobModel.getAll()
      socket.emit('job:save')
      io.emit('booking:get:all', updateBookings)
      io.emit('job:get:id', jobId)
      io.emit('job:get:all', jobs)
    }
  }
  _.forOwn(topics, (callback, topic) => {
    socket.on(topic, callback)
  })
}
