import Immutable from 'immutable'
import _ from 'lodash'
import moment from 'moment'

function getInitialRoomState (id, assignment) {
  const room = assignment === 'Onscreen room' ? 'O' : 'S'
  console.log(room)

  return Immutable.Map({
    id,
    room: room,
    status: 'TENTATIVE',
    date: [moment(), moment()],
    assistance: [],
    equipments: [],
    preset: 'no',
    startTime: moment('09:00', 'HH:mm'),
    endTime: moment('09:00', 'HH:mm')
  })
}
const initialState = Immutable.Map({
  '0': getInitialRoomState('0')
})

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
    case 'ADD_BOOKING_ROOM': {
      return state.set(action.id, getInitialRoomState(action.id))
    }
    case 'SAVE_UNFINISHED_JOB': {
      if (action.job.name === 'assignment') {
        return Immutable.Map({'0': getInitialRoomState('0', action.job.value)})
      }
      break
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

    case 'ADD_DEFAULT_EQUIPMENTS': {
      const { bookingId, preset } = action
      const presetsMap = {
        profoto: [
          { equipment: 'Pro-8a 2400 AirEUR', amount: 2, type: 'Profoto' },
          { equipment: 'Century Stand', amount: 4, type: 'Light stand' },
          { equipment: 'ProHead', amount: 4, type: 'Profoto' },
          { equipment: 'Profoto Air Remote', amount: 1, type: 'Profoto' }
        ],
        broncolor: [
          { equipment: 'Broncolor ScoroE 3200', amount: 2, type: 'broncolor' },
          { equipment: 'Century Stand', amount: 4, type: 'Light stand' },
          { equipment: 'Lamp Base Pulso G+reflector', amount: 4, type: 'broncolor' },
          { equipment: 'Transceiver RSF2 Broncolor', amount: 1, type: 'broncolor' }
        ]
      }
      return state.updateIn([bookingId, 'equipments'], arr => {
        return presetsMap[preset]
      })
    }

    default: {
      return state
    }

  }
}

export default bookingsUnfinishedReducer
