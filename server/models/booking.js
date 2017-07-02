import log4js from 'log4js'
import mongoose from 'mongoose'
const logger = log4js.getLogger()
const bookingSchema = mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['CONFIRMED', 'TENTATIVE', 'CANCLE']
  },
  description: { type: String, required: true },
  room: {
    type: String,
    required: true,
    enum: ['X', 'M', 'L', 'XL', 'G', 'ONSCREEN']
  },
  photographer: { type: String, required: true },
  shootingDates: { type: [Date], required: true },
  times: { type: [Date], required: true },
  assistants: [{ type: String }],
  equipments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'equipments'} ]
})

bookingSchema.index({ id: 1, room: 1 }, { unique: true })

const Booking = mongoose.model('bookings', bookingSchema)

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
