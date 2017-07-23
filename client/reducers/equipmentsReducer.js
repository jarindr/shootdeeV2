const initialState = []
const equipmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_EQUIPMENTS':
      return action.equipments
    default:
      return state
  }
}
export default equipmentsReducer
