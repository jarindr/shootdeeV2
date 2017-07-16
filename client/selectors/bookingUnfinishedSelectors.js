export const selectbookingUnfinished = (state) => {
  return state.bookingUnfinished.valueSeq()
}

export const selectGetBookingUnfinishedEquipmentsById = (state) => (id) => {
  return _.sortBy(state.bookingUnfinished.get(id).equipments, x => x.type))
}

