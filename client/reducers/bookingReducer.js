const initialState = []
const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOOKINGS_RECIEVED':
      return action.bookings
    default:
      return state
  }
}
export default bookingReducer
