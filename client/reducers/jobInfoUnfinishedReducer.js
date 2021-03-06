import Immutable from 'immutable'
const initialState = Immutable.Map({
  id: 'getting id...',
  customer: '',
  assignment: 'Studio rental',
  description: ''
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
    case 'SUBMIT_JOB': {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default jobInfoUnfinishedReducer
