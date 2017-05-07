import log4js from 'log4js'
import mongoose from 'mongoose'
const logger = log4js.getLogger()
const bookingSchema = mongoose.Schema({
  bookingId: { type: String, required: true },
  customer: { type: String },
  assignment: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['CONFIRMED', 'TENTATIVE', 'CANCLE']
  },
  job: { type: String, required: true },
  studioRoom: {
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

bookingSchema.index({ bookingId: 1, studioRoom: 1 }, { unique: true })

bookingSchema.findById = (id, callback) => {
  this.find({ bookingId: id }, callback)
}
const Booking = mongoose.model('bookings', bookingSchema)

export function insertBookingsAsync ({data, onSuccess, onFailed}) {
  const booking = new Booking(data)
  booking.save((err, result) => {
    if (err) {
      onFailed()
      logger.error(err)
    } else {
      onSuccess()
      logger.info('booking saved to database.')
    }
  })
}
