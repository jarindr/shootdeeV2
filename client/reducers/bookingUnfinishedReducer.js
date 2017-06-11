const initialState = {}
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_UNFINISHED_BOOKINGS':
      return Object.assign({}, state, { booking: action.booking.data })
    default:
      return state
  }
}
export default bookingsReducer
