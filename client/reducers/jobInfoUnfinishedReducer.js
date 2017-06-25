import Immutable from 'immutable'
import _ from 'lodash'
const initialState = Immutable.Map({
  bookings: [0]
})
const bookingsUnfinishedReducer = (state = initialState, action) => {
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

export default bookingsUnfinishedReducer
