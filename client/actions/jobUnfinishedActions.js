import * as bc from '../backend'

export const saveUnfinshedJob = (job) => ({ type: 'SAVE_UNFINISHED_JOB', job })

export const jobIdRecievedFromBackend = (jobId) => ({ type: 'SET_BOOKING_ID', jobId })

export function submitJob () {
  return (dispatch, getState) => {
    const { jobUnfinished, bookingUnfinished } = getState()
    bc.publish('job:save', { jobUnfinished, bookingUnfinished })
    dispatch({ type: 'SUBMIT_JOB' })
  }
}
