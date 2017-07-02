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

export function submitJob () {
  return (dispatch, getState) => {
    const { job, bookingUnfinished } = getState()
    bc.publish('job:save', { job, bookingUnfinished })
    dispatch({ type: 'SUBMIT_JOB' })
  }
}
