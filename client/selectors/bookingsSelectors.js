export const selectBookingsByJobId = (state) => (id) => {
  return state.bookings.filter(b => b.id.split('-')[0] === id)
}

export const selectBookingWithJobDetail = (state) => (id) => {
  const jobId = id.split('-')[0]
  const job = state.jobs.filter(job => job.id === jobId)[0]
  const booking = state.bookings.filter(booking => booking.id === id)[0]
  return _.omit({...job, ...booking}, ['bookings'])
}

export const selectBookingsWithJobDetail = (state) => {
  const byKeyJob = _(state.jobs).keyBy((job) => job.id).omit(['bookings']).value()
  return state.bookings.map(booking => {
    const id = booking.id.split('-')[0]
    return Object.assign({}, byKeyJob[id], booking)
  })
}
