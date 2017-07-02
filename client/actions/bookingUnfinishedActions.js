export function getUnfinshedBooking (booking) {
  return {
    type: 'GET_UNFINISHED_BOOKING',
    response: booking
  }
}

export function saveUnfinshedBooking (bookingUnfinished) {
  return {
    type: 'SAVE_UNFINISHED_BOOKING',
    bookingUnfinished
  }
}

export function removeUnfinshedEquipment (equipmentId, id) {
  return {
    type: 'REMOVE_EQUIPMENT_UNFINISHED_BOOKING',
    equipmentId,
    bookingId: id
  }
}

export function addDefaultEquipment (bookingId, preset) {
  return {
    type: 'ADD_DEFAULT_EQUIPMENTS',
    bookingId,
    preset
  }
}
