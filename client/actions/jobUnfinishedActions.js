import * as bc from '../backend'

export const saveUnfinshedJob = (job) => ({ type: 'SAVE_UNFINISHED_JOB', job })

export const saveEditUnfinshedJob = (job) => ({ type: 'SAVE_EDIT_UNFINISHED_JOB', job })

export const jobIdRecievedFromBackend = (jobId) => ({ type: 'SET_BOOKING_ID', jobId })

export const submitJob = () => (dispatch, getState) => {
  const { jobUnfinished, bookingUnfinished } = getState()
  bc.publish('job:save', { jobUnfinished, bookingUnfinished: bookingUnfinished.filter(x => !x.deleted) })
  dispatch({ type: 'SUBMIT_JOB' })
}
