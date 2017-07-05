import Immutable from 'immutable'
export const selectGetBookingUnfinishedById = (state) => {
  return (id) => {
    return state.bookingUnfinished.get(id) ? state.bookingUnfinished.get(id) : Immutable.Map()
  }
}
export const selectbookingUnfinished = (state) => {
  return state.bookingUnfinished
}

export const selectGetBookingUnfinishedEquipmentsById = (state) => {
  return (id) => {
    const equipments = state.bookingUnfinished.getIn([id, 'equipments'])
    return equipments
  }
}

