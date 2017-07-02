import * as bc from '../backend'

export function saveUnfinshedJob (job) {
  return {
    type: 'SAVE_UNFINISHED_JOB',
    job
  }
}

export function jobIdRecievedFromBackend (jobId) {
  return {
    type: 'SET_BOOKING_ID',
    jobId
  }
}

export function submitBooking () {
  return (dispatch, getState) => {
    const { job } = getState()
    bc.publish('booking:save', job)
    dispatch({ type: 'SUBMIT_BOOKING' })
  }
}
