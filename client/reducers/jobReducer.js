const initialState = Immutable.Map()
import Immutable from 'immutable'
const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOBS_RECIEVED': {
      const { jobs } = action
      return Immutable.Map(_.keyBy(jobs, x => x.id))
    }
    default: {
      return state
    }

  }
}

export default jobsReducer
