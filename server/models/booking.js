import mongoose from 'mongoose'
import CounterModel from './counter'
import { generateAltId } from './helpers'
const bookingSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  jobId: { type: String },
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
  usedEquipmentIds: { type: Object },
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
