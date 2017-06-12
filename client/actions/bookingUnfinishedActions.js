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

