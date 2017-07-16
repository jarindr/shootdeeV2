import Immutable from 'immutable'
import _ from 'lodash'
import moment from 'moment'

function getInitialRoomState (id, assignment) {
  const room = assignment === 'Onscreen room' ? 'O' : 'S'
  return {
    id,
    room: room,
    status: 'TENTATIVE',
    date: [moment(), moment()],
    assistance: [],
    equipments: [],
    preset: 'no',
    startTime: moment('09:00', 'HH:mm'),
    endTime: moment('09:00', 'HH:mm')
  }
}
const initialState = Immutable.Map({
  '0': getInitialRoomState('0')
})

const bookingsUnfinishedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_UNFINISHED_BOOKING': {
      const { id, name, value } = action.bookingUnfinished
      const equipmentsArr = state.get(id).equipments
      if (name === 'equipments') {
        const index = _.findIndex(equipmentsArr, x => x.equipment === value.equipment)
        if (index === -1) {
          return state.set(id, {...state.get(id), ...{ equipments: [...equipmentsArr, value] }})
        } else {
          equipmentsArr.splice(index, 0, value)
        }
        return state.set(id, {...state.get(id), ...{ equipments: [...equipmentsArr, value] }})
      }

      return state.set(id, {...state.get(id), ...{[name]: value}})
    }
    case 'ADD_BOOKING_ROOM': {
      return state.set(action.id, getInitialRoomState(action.id))
    }
    case 'SAVE_UNFINISHED_JOB': {
      if (action.job.name === 'assignment') {
        return Immutable.Map({ '0': getInitialRoomState('0', action.job.value) })
      }
      return state
    }
    case 'REMOVE_EQUIPMENT_UNFINISHED_BOOKING': {
      const { bookingId, equipmentId } = action
      const equipmentsArr = state.get(bookingId).equipments
      const index = _.findIndex(equipmentsArr, x => x.equipment === equipmentId)
      _.pullAt(equipmentsArr, [index])
      return state.set(bookingId, {...state.get(bookingId), ...{ equipments: equipmentsArr }})
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
      return state.set(bookingId, {...state.get(bookingId), ...{ equipments: presetsMap[preset] }})
    }

    default: {
      return state
    }

  }
}

export default bookingsUnfinishedReducer
