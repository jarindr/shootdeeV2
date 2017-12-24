export const selectBookingsByJobId = (state) => (id) => {
  return state.jobs.get(id).bookings.map(booking => {
    return state.bookings.get(booking)
  })
}
export const selectBookingById = (state) => (id) => {
  return state.bookings.get(id)
}

export const selectBookingWithJobDetail = (state) => (id) => {
  const jobId = id.split('-')[0]
  const job = state.jobs.get(jobId)
  const booking = state.bookings.toArray().find(booking => booking.id === id)
  return _.omit({...job, ...booking}, ['bookings'])
}

export const selectBookingsWithJobDetail = (state) => {
  return state.bookings.toArray()
  .filter(booking => !booking.deleted)
  .map(booking => ({ ...state.jobs.get(booking.jobId), ...booking }))
}
