import Immutable from 'immutable'
const initialState = Immutable.Map({
  bookings: [0],
  id: 'getting id...',
  customer: '',
  assignment: 'Studio rental'
})
const jobInfoUnfinishedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_UNFINISHED_JOB': {
      const { name, value } = action.job
      return state.setIn([name], value)
    }
    case 'SET_BOOKING_ID': {
      return state.setIn(['id'], action.jobId)
    }
    default: {
      return state
    }
  }
}

export default jobInfoUnfinishedReducer
