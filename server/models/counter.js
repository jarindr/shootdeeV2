import mongoose from 'mongoose'
const counterSchema = mongoose.Schema({
  seq: { type: Number, default: 0 },
  id: { type: String, unique: true }
})

export default mongoose.model('counter', counterSchema)

