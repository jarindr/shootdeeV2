export const getAllBookings = (state) => {
  return { bookings: state.bookings.data }
}

export const selectBookingsByJobId = (state) => (id) => {
  return state.bookings.filter(b => b.id.split('-')[0] === id)
}
