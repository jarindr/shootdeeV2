import log4js from 'log4js'
import moment from 'moment'
import mongoose from 'mongoose'
import { Booking } from './booking'
const logger = log4js.getLogger()
const job = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: { type: String },
  assignment: { type: String, required: true },
  description: { type: String },
  bookings: { type: [String] }
})

const JobModel = mongoose.model('job', job)

export function saveJob ({ job, bookingUnfinished, onSuccess, onFailed }) {
  const newJob = new JobModel(job)
  newJob.save((err, result) => {
    if (err) {
      onFailed()
      logger.error(err)
    } else {
      onSuccess()
      logger.info(`job ${job.id} completely saved to database`)
    }
  })

  Booking.insertMany(bookingUnfinished, (err, docs) => {
    if (err) {
      onFailed()
      logger.error(err)
    } else {
      onSuccess()
      logger.info(`bookings completely saved to database`)
    }
  })
}

export function getJobId ({ onSuccess, onFailed }) {
  JobModel.count({}, (err, result) => {
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

export function getAll ({ onSuccess, onFailed }) {
  JobModel.find({}, null, (err, result) => {
    if (err) {
      onFailed(err)
      logger.error(err)
    } else {
      onSuccess(result)
      logger.info('get all bookings completed.')
    }
  })
}
