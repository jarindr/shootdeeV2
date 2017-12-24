import { generateAltId } from './helpers'
import mongoose from 'mongoose'
import { Booking } from './booking'
import CounterModel from './counter'
import _ from 'lodash'
const job = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: { type: String },
  assignment: { type: String, required: true },
  description: { type: String },
  bookings: { type: [String] }
})

job.pre('save', (next) => {
  CounterModel.findOneAndUpdate({ id: 'jobCounter' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true },
    (error, counter) => {
      if (error) { return next(error) }
      job.id = generateAltId(counter.seq)
      next()
    })
})

const JobModel = mongoose.model('job', job)
export async function saveJob ({ job, bookingUnfinished }) {
  const insertedJob = await JobModel.create(job)
  const toInsertBookings = _.values(bookingUnfinished).map((booking, i) => {
    return Object.assign(booking, {
      jobId: insertedJob.id,
      id: `${insertedJob.id}-${i}`
    })
  })
  const insertedBookings = await Booking.insertMany(toInsertBookings)
  await JobModel.findOneAndUpdate({
    id: insertedJob.id
  },
    { bookings: insertedBookings.map(b => b.id) })
}

export async function saveEditJob ({ job, bookings }) {
  const jobPromise = new Promise((resolve, reject) => {
    JobModel.findOneAndUpdate({ id: job.id }, job, { upsert: true })
      .then(() => resolve())
  })

  const bookingPromise = bookings.map(booking => {
    return new Promise((resolve, reject) => {
      Booking.findOneAndUpdate({ id: booking.id }, booking, { upsert: true })
        .then(() => resolve())
    })
  })
  return Promise.all([jobPromise, ...bookingPromise])
}

export async function getJobId () {
  const result = await CounterModel.findOne({ id: 'jobCounter' }) || { seq: 0 }
  return generateAltId(result.seq)
}

export async function getAll () {
  return JobModel.find({}, null)
}
