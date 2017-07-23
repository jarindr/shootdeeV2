import * as bc from '../backend'

export const submitEditJob = ({job, bookings}) => (dispatch, getState) => {
  bc.publish('job:edit:save', { job, bookings })
  dispatch({ type: 'SUBMIT_EDIT_JOB' })
}
