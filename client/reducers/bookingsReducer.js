const initialState = { status: null }
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVING_BOOKING':
      return Object.assign({}, state, { bookingData: action.data, bookingStatus: action.type })
    case 'SUCCESS_BOOKING':
      return Object.assign({}, state, { bookingStatus: action.type })
    case 'FAILED_BOOKING':
      return Object.assign({}, state, { bookingStatus: action.type })
    default:
      return state
  }
}
export default bookingsReducer
