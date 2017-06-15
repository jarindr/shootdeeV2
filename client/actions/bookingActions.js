export function saveBookingAction (payload) {
  return {
    type: 'SAVING_BOOKINGS',
    payload,
    response: null
  }
}
export function saveBookingSuccessAction (response) {
  return {
    type: 'SAVING_BOOKINGS_SUCCESS',
    response
  }
}

export function saveBookingFailedAction (err) {
  return {
    type: 'SAVING_BOOKINGS_FAILED',
    response: err
  }
}

export function getBookingAction (bookingId) {
  return {
    type: 'GETTING_BOOKINGS',
    bookingId,
    response: null
  }
}

export function getBookingSuccessAction (response) {
  return {
    type: 'GETTING_BOOKINGS_SUCCESS',
    response
  }
}

export function getBookingFailedAction (err) {
  return {
    type: 'GETTING_BOOKINGS_FAILED',
    response: err
  }
}

export function getUnfinshedBooking (booking) {
  return {
    type: 'GET_UNFINISHED_BOOKINGS',
    response: booking
  }
}

export function saveUnfinshedBooking (booking) {
  return {
    type: 'SET_UNFINISHED_BOOKINGS',
    response: booking
  }
}

