import Immutable from 'immutable'

const initialState = []

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOBS_RECIEVED': {
      const { jobs } = action
      return jobs
    }
    default: {
      return state
    }

  }
}

export default jobsReducer
