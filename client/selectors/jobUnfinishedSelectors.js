export const selectjobInfoUnfinished = (state) => {
  return {
    customer: state.jobUnfinished.get('customer'),
    description: state.jobUnfinished.get('description'),
    assignment: state.jobUnfinished.get('assignment')
  }
}
