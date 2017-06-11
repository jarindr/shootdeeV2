export function getUnfinshedBooking (booking) {
  return {
    type: 'GET_UNFINISHED_BOOKINGS',
    response: booking
  }
}

export function saveUnfinshedBooking (booking) {
  return {
    type: 'SAVE_UNFINISHED_BOOKINGS',
    response: booking
  }
}

