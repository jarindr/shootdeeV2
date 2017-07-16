import Immutable from 'immutable'
const initialState = Immutable.Map()
const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOOKINGS_RECIEVED':
      return Immutable.Map(_.keyBy(action.bookings, x => x.id))
    default:
      return state
  }
}
export default bookingReducer
