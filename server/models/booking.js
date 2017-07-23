import log4js from 'log4js'
import mongoose from 'mongoose'
const logger = log4js.getLogger()
const bookingSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  status: {
    type: String,
    required: true,
    enum: ['CONFIRM', 'TENTATIVE', 'CANCLE']
  },
  room: {
    type: String,
    required: true,
    enum: ['S', 'M', 'L', 'XL', 'G', 'O']
  },
  photographer: { type: String },
  date: { type: [Date] },
  startTime: { type: String },
  endTime: { type: String },
  assistants: { type: [String] },
  equipments: { type: Array },
  preset: { type: String }
})

export const Booking = mongoose.model('bookings', bookingSchema)
export async function saveBookings ({ data }) {
  const booking = new Booking(data)
  await booking.save()
}

export async function getAll () {
  return Booking.find({}, null)
}
