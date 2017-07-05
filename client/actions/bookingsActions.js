
export function getAllBookingsAction () {
  return {
    type: 'GETTING_ALL_BOOKINGS'
  }
}

export function getAllBookingsSuccessAction (bookings) {
  return {
    type: 'GETTING_ALL_BOOKINGS_SUCCESS',
    data: bookings
  }
}

export function getAllBookingsFailedAction (err) {
  return {
    type: 'GETTING_ALL_BOOKINGS_FAILED',
    response: err
  }
}

