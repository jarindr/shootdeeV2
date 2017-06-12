const initialState = {}
const bookingUnfinishedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_UNFINISHED_BOOKING':
      return Object.assign({}, state, action.bookingUnfinished)
    default:
      return state
  }
}
export default bookingUnfinishedReducer
