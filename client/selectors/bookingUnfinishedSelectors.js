import Immutable from 'immutable'
export const selectGetBookingUnfinishedById = (state) => {
  return { selectBookingUnfinishedById: (id) => {
    return { bookingUnfinished: state.bookingUnfinished.get(id) ? state.bookingUnfinished.get(id) : Immutable.Map() }
  }}
}
