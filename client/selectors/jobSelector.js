export const selectjobs = (state) => {
  const byKeyJob = _.keyBy(state.jobs, (job) => job.id)
  return state.bookings.map(booking => {
    const id = booking.id.split('-')[0]
    return Object.assign({}, booking, byKeyJob[id])
  })
}

export const selectjobById = (state) => (id) => {
  return state.jobs.filter(x => x.id === id)[0]
}
