import Immutable from 'immutable'
import _ from 'lodash'
const initialState = Immutable.Map()
const bookingsUnfinishedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_UNFINISHED_BOOKING':
      const { id, name, value } = action.bookingUnfinished
      if (name === 'equipments') {
        if (!state.getIn([id, name])) {
          return state.setIn([id, name], [value])
        } else {
          return state.updateIn([id, name], arr => [...arr, value])
        }
      }
      return state.setIn([id, name], value)
    default:
      return state
  }
}

export default bookingsUnfinishedReducer
