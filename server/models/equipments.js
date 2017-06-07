import mongoose from 'mongoose'
const equipmentSchema = mongoose.Schema({
  equipmentId: { type: String, unique: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  counter: { type: Number, required: true }
})

export const equipments = mongoose.model('equipments', equipmentSchema)
