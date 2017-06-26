import Immutable from 'immutable'
const initialState = Immutable.Map({
  bookings: [0]
})
const jobInfoUnfinishedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_UNFINISHED_JOB': {
      const { name, value } = action.job
      return state.setIn([name], value)
    }
    case 'SET_BOOKING_ID': {
      return state.setIn(['id'], action.bookingId)
    }
    default: {
      return state
    }
  }
}

export default jobInfoUnfinishedReducer
