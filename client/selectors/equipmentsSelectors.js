export const selectEquipmentList = (state) => {
  return state.equipments
}
export const selectEquipmentIdsByEquipmentId = (state) => (equipmentDescription) => {
  console.log(state.equipments.filter(x => x.description === equipmentDescription))

  return state.equipments.filter(x => x.description === equipmentDescription)
}

