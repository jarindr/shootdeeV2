import mongoose from 'mongoose'
const logger = log4js.getLogger()
import log4js from 'log4js'
const equipmentSchema = mongoose.Schema({
  equipmentId: { type: String, unique: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  counter: { type: Number, required: true }
})

export const Equipments = mongoose.model('equipments', equipmentSchema)

export function getAllEquipments ({ onSuccess, onFailed }) {
  return Equipments.find({}, null, (err, result) => {
    if (err) {
      onFailed(err)
      logger.error(err)
    } else {
      onSuccess(result)
      logger.info('get all equipments completed.')
    }
  })
}
