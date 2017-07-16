export const selectBookingsByJobId = (state) => (id) => {
  return state.bookings.toArray().filter(x => x.id.split('-')[0] === id)
}

export const selectBookingWithJobDetail = (state) => (id) => {
  const jobId = id.split('-')[0]
  const job = state.jobs.get(jobId)
  const booking = state.bookings.toArray().filter(booking => booking.id === id)[0]
  return _.omit({...job, ...booking}, ['bookings'])
}

export const selectBookingsWithJobDetail = (state) => {
  return state.bookings.toArray().map(booking => ({ ...state.jobs.get(booking.id.split('-')[0]), ...booking }))
}
