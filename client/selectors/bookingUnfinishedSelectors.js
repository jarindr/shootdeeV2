export const selectbookingUnfinished = (state) => {
  return state.bookingUnfinished.toArray()
}

export const selectUnfinishedEquipmentsById = (state) => (id) => {
  return _.sortBy(state.bookingUnfinished.get(id).equipments, x => x.type)
}

