export const selectjobById = (state) => (id) => {
  return state.jobs.get(id)
}
