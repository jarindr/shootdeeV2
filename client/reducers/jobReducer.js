const initialState = []
import Immutable from 'immutable'
const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOBS_RECIEVED': {
      const { jobs } = action
      return jobs.map(x => Immutable.Map(x))
    }
    default: {
      return state
    }

  }
}

export default jobsReducer
