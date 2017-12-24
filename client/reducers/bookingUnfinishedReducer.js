import Immutable from 'immutable'
import _ from 'lodash'
import moment from 'moment'
import { PRESETS } from '../misc/constants'

export function getInitialRoomState (id, assignment) {
  const room = assignment === 'Onscreen room' ? 'O' : 'S'
  return {
    id,
    room,
    status: 'TENTATIVE',
    date: [moment(), moment()],
    assistance: [],
    equipments: [],
    preset: 'no',
    startTime: moment('09:00', 'HH:mm'),
    endTime: moment('09:00', 'HH:mm'),
    usedEquipmentIds: {}
  }
}
const initialState = Immutable.Map({
  '0': getInitialRoomState('0')
})

const bookingsUnfinishedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_UNFINISHED_BOOKING': {
      const { id, name, value } = action.bookingUnfinished
      if (name === 'equipments') {
        const equipmentsArr = state.get(id).equipments
        const index = _.findIndex(equipmentsArr, x => x.equipment === value.equipment)
        if (index !== -1) equipmentsArr.splice(index, 0, value)
        return state.set(id, { ...state.get(id), ...{ equipments: [...equipmentsArr, value] } })
      }
      if (name === 'usedEquipmentIds') {
        const usedEquipmentIds = state.get(id).usedEquipmentIds
        const oldEquipmentIds = usedEquipmentIds[value.equipmentName] || {}
        return state.set(id, {
          ...state.get(id),
          ...{ usedEquipmentIds:
          { ...usedEquipmentIds,
            ...{ [value.equipmentName]:
              { ...oldEquipmentIds, ...{ [String(value.index)]: value.usedEquipmentId } }
            }
          }
          }
        })
      }

      return state.set(id, { ...state.get(id), ...{ [name]: value } })
    }
    case 'ADD_BOOKING_ROOM': {
      return state.set(action.id, getInitialRoomState(action.id))
    }

    case 'REMOVE_BOOKING_ROOM': {
      const id = action.id
      return state.set(id, { ...state.get(id), ...{ deleted: true } })
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
      return state.set(bookingId, { ...state.get(bookingId), ...{ equipments: equipmentsArr } })
    }

    case 'ADD_DEFAULT_EQUIPMENTS': {
      const { bookingId, preset } = action
      return state.set(bookingId, { ...state.get(bookingId), ...{ equipments: PRESETS[preset] } })
    }

    default: {
      return state
    }

  }
}

export default bookingsUnfinishedReducer
