import Immutable from 'immutable'
import _ from 'lodash'
const initialState = Immutable.Map()
const bookingsUnfinishedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_UNFINISHED_BOOKING':
      const { id, name, value } = action.bookingUnfinished
      return state.setIn([id, name], value)

    default:
      return state
  }
}

export default bookingsUnfinishedReducer
