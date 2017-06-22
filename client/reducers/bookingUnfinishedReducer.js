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
          return state.updateIn([id, name], arr => {
            const index = _.findIndex(arr, x => x.equipment === value.equipment)
            return index === -1 ? [...arr, value] : arr.map((x, i) => i === index ? value : x)
          })
        }
      }
      return state.setIn([id, name], value)

    case 'REMOVE_EQUIPMENT_UNFINISHED_BOOKING':
      const { bookingId, equipmentId } = action
      return state.updateIn([bookingId, 'equipments'], arr => {
        const index = _.findIndex(arr, x => x.equipment === equipmentId)
        if (arr.length === 1 && index === 0) {
          return []
        }
        _.pullAt(arr, [index])
        return [...arr]
      })
    default:
      return state
  }
}

export default bookingsUnfinishedReducer
