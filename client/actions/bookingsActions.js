const request = require('request-promise')

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

export function getAllBookings () {
  return (dispatch) => {
    dispatch(getAllBookingsAction())
    request('http://localhost:9000/api/bookings/all/', { method: 'GET' })
      .then(bookings => {
        dispatch(getAllBookingsSuccessAction(JSON.parse(bookings)))
      })
      .catch(err => {
        dispatch(getAllBookingsFailedAction(err))
      })
  }
}
