import log4js from 'log4js'
import moment from 'moment'
import mongoose from 'mongoose'
const logger = log4js.getLogger()
const job = mongoose.Schema({
  id: { type: String, required: true },
  customer: { type: String },
  assignment: { type: String, required: true }
})

job.index({ id: 1, room: 1 }, { unique: true })

const Booking = mongoose.model('job', job)

export function saveJobAsync ({ data, onSuccess, onFailed }) {
  const booking = new Booking(data)
  booking.save((err, result) => {
    if (err) {
      onFailed()
      logger.error(err)
    } else {
      onSuccess()
      logger.info(`job ${data.id} completely saved to database`)
    }
  })
}

export function getJobIdAsync ({ onSuccess, onFailed }) {
  Booking.count({}, (err, result) => {
    if (err) {
      onFailed(err)
      logger.error(err)
    } else {
      let count = `000${result}`
      count = count.substr(count.length - 4)
      const id = `Q${moment().format('YYDD')}${count}`
      onSuccess(id)
    }
  })
}

export function getAllJobAsync ({ onSuccess, onFailed }) {
  Booking.find({}, null, (err, result) => {
    if (err) {
      onFailed(err)
      logger.error(err)
    } else {
      onSuccess(result)
      logger.info('get all bookings completed.')
    }
  })
}
