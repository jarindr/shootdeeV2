const request = require('request-promise')

export function saveBookingAction (payload) {
  return {
    type: 'SAVING_BOOKING',
    payload,
    response: null
  }
}
export function saveBookingSuccessAction (response) {
  return {
    type: 'SAVING_BOOKING_SUCCESS',
    response
  }
}

export function saveBookingFailedAction (err) {
  return {
    type: 'SAVING_BOOKING_FAILED',
    response: err
  }
}

export function getBookingAction (bookingId) {
  return {
    type: 'GETTING_BOOKING',
    bookingId,
    response: null
  }
}

export function getBookingSuccessAction (response) {
  return {
    type: 'GETTING_BOOKING_SUCCESS',
    response
  }
}

export function getBookingFailedAction (err) {
  return {
    type: 'GETTING_BOOKING_FAILED',
    response: err
  }
}

export function saveBooking () {
  return (dispatch) => {
    dispatch(saveBookingAction())
    request('http://localhost:3000/api/bookings/', { method: 'POST' })
      .then(response => {
        if (response.status === 200) {
          dispatch(getBookingSuccessAction(response))
        }
      })
      .catch(err => {
        dispatch(getBookingFailedAction(err))
      })
  }
}

export function getBooking (bookingId) {
  return (dispatch) => {
    dispatch(getBookingAction(bookingId))
    request('http://localhost:3000/api/bookings/', { method: 'GET' })
      .then(response => {
        if (response.status === 200) {
          dispatch(getBookingSuccessAction(response))
        }
      })
      .catch(err => {
        dispatch(getBookingFailedAction(err))
      })
  }
}
