const initialState = { status: null }
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVING_BOOKINGS':
      return Object.assign({}, state, { bookingStatus: action.type })
    case 'SAVING_BOOKINGS_SUCCESS':
      return Object.assign({}, state, { bookingStatus: action.type })
    case 'SAVING_BOOKINGS_FAILED':
      return Object.assign({}, state, { bookingStatus: action.type })
    case 'GETTING_ALL_BOOKINGS':
      return Object.assign({}, state, { bookingStatus: action.type })
    case 'GETTING_ALL_BOOKINGS_SUCCESS':
      return Object.assign({}, state, { bookingStatus: action.type, data: action.data })
    case 'GETTING_ALL_BOOKINGS_FAILED':
      return Object.assign({}, state, { bookingStatus: action.type })
    default:
      return state
  }
}
export default bookingsReducer
