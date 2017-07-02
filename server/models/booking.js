import log4js from 'log4js'
import mongoose from 'mongoose'
const logger = log4js.getLogger()
const bookingSchema = mongoose.Schema({
  id: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['CONFIRMED', 'TENTATIVE', 'CANCLE']
  },
  room: {
    type: String,
    required: true,
    enum: ['S', 'M', 'L', 'XL', 'G', 'ONSCREEN']
  },
  photographer: { type: String },
  date: { type: [Date] },
  startTime: { type: String },
  endTime: { type: String },
  assistants: [{ type: String }],
  equipments: [ {type: Object} ]
})

bookingSchema.index({ id: 1, room: 1 }, { unique: true })

export const Booking = mongoose.model('bookings', bookingSchema)

export function saveBookingsAsync ({ data, onSuccess, onFailed }) {
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

export function getAllBookingsAsync ({ onSuccess, onFailed }) {
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
