import mongoose from 'mongoose'
const equipmentSchema = mongoose.Schema({
  equipmentId: { type: String, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true }
})

export const equipments = mongoose.model('equipments', equipmentSchema)
