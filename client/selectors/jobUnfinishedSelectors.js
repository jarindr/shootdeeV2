export const selectjobInfoUnfinished = (state) => {
  return {
    id: state.jobUnfinished.get('id'),
    customer: state.jobUnfinished.get('customer'),
    description: state.jobUnfinished.get('description'),
    assignment: state.jobUnfinished.get('assignment')
  }
}
