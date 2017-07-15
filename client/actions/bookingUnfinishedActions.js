export const saveUnfinshedBooking = (bookingUnfinished) => (
  { type: 'SAVE_UNFINISHED_BOOKING', bookingUnfinished }
)
export const removeUnfinshedEquipment = (equipmentId, bookingId) => (
  { type: 'REMOVE_EQUIPMENT_UNFINISHED_BOOKING', equipmentId, bookingId }
)
export const addBookingRoom = (id) => (
  { type: 'ADD_BOOKING_ROOM', id }
)
export const addDefaultEquipment = (bookingId, preset) => (
  { type: 'ADD_DEFAULT_EQUIPMENTS', bookingId, preset }
)

export const saveEditUnfinshedBooking = (bookingUnfinished) => (
  { type: 'SAVE_EDIT_UNFINISHED_BOOKING', bookingUnfinished }
)
export const removeEditUnfinshedEquipment = (equipmentId, bookingId) => (
  { type: 'REMOVE_EDIT_EQUIPMENT_UNFINISHED_BOOKING', equipmentId, bookingId }
)
export const addEditBookingRoom = (id) => (
  { type: 'ADD_EDIT_BOOKING_ROOM', id }
)
export const addEditDefaultEquipment = (bookingId, preset) => (
  { type: 'ADD_EDIT_DEFAULT_EQUIPMENTS', bookingId, preset }
)
