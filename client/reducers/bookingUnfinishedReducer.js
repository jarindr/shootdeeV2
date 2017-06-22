import Immutable from 'immutable'
import _ from 'lodash'
const initialState = Immutable.Map()
const bookingsUnfinishedReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SAVE_UNFINISHED_BOOKING': {
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
    }

    case 'REMOVE_EQUIPMENT_UNFINISHED_BOOKING': {
      const { bookingId, equipmentId } = action
      return state.updateIn([bookingId, 'equipments'], arr => {
        const index = _.findIndex(arr, x => x.equipment === equipmentId)
        if (arr.length === 1 && index === 0) {
          return []
        }
        _.pullAt(arr, [index])
        return [...arr]
      })
    }

    case 'ADD_DEFAULT_PROPHOTO': {
      const { bookingId } = action
      const defaultProphoto = [
        { equipment: 'Pro-8a 2400 AirEUR', amount: 2, type: 'prophoto' },
        { equipment: 'Century Stand', amount: 4, type: 'Light stand' },
        { equipment: 'ProHead', amount: 4, type: 'prophoto' },
        { equipment: 'Profoto Air Remote', amount: 1, type: 'prophoto' }
      ]

      return state.updateIn([bookingId, 'equipments'], arr => {
        if (_.isEmpty(arr)) {
          return defaultProphoto
        }
        return _.uniqWith([...defaultProphoto, ...arr], (arr1, arr2) => {
          return arr1.equipment === arr2.equipment
        })
      })
    }

    default: {
      return state
    }

  }
}

export default bookingsUnfinishedReducer
