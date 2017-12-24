import { selectjobById } from './jobSelector'
export const selectBookingsByJobId = (state) => (id) => {
  return state.jobs.get(id).bookings.map(booking => {
    return state.bookings.get(booking)
  })
}
export const selectBookingById = (state) => (id) => {
  return state.bookings.get(id)
}

export const selectBookings = (state) => {
  return state.bookings.toArray().filter(booking => !booking.deleted)
}
export const selectBookingWithJobDetail = (state) => (id) => {
  const booking = state.bookings.get(id)
  const job = selectjobById(booking.jobId)
  return _.omit({ ...job, ...booking }, ['bookings'])
}

export const selectBookingsWithJobDetail = (state) => {
  return selectBookings(state).map(booking => {
    return { ...selectjobById(state)(booking.jobId), ...booking }
  })
}

