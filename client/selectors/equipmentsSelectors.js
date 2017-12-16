export const selectEquipmentList = (state) => {
  return state.equipments
}
export const selectEquipmentIdsByEquipmentId = (state) => (equipmentDescription) => {
  return state.equipments.filter(x => x.description === equipmentDescription)
}

