export const selectbookingUnfinished = (state) => {
  return state.bookingUnfinished
}

export const selectGetBookingUnfinishedEquipmentsById = (state) => (id) => {
  const equipments = state.bookingUnfinished.getIn([id, 'equipments'])
  return equipments
}

