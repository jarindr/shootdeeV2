import Immutable from 'immutable'
import _ from 'lodash'
const initialState = Immutable.Map()
const bookingsUnfinishedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_UNFINISHED_BOOKING':
      const { id, name, value } = action.bookingUnfinished
      if (name === 'equipments') {
        if (state.getIn([id, 'equipments'])) {
          return state.updateIn([id, 'equipments'], (equipments) => equipments.push(value))
        } else {
          return state.setIn([id, 'equipments'], Immutable.List([value]))
        }
      }
      return state.setIn([id, name], value)

    default:
      return state
  }
}

export default bookingsUnfinishedReducer
