export function getUnfinshedJob (job) {
  return {
    type: 'SAVE_UNFINISHED_JOB',
    job
  }
}

export function bookingIdRecievedFromBackend (bookingId) {
  return {
    type: 'SET_BOOKING_ID',
    bookingId
  }
}
