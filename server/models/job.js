import moment from 'moment'
import mongoose from 'mongoose'
import { Booking } from './booking'
const job = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: { type: String },
  assignment: { type: String, required: true },
  description: { type: String },
  bookings: { type: [String] }
})

const JobModel = mongoose.model('job', job)

export async function saveJob ({ job, bookingUnfinished}) {
  const newJob = new JobModel(job)
  await newJob.save()
  await Booking.insertMany(bookingUnfinished)
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
  const result = await JobModel.count({})
  let count = `000${result}`
  count = count.substr(count.length - 4)
  return `Q${moment().format('YYDD')}${count}`
}

export async function getAll () {
  return JobModel.find({}, null)
}
