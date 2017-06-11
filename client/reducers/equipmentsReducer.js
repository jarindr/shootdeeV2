const initialState = { data: null }
const equipmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_EQUIPMENTS':
      return Object.assign({}, state, { data: action.equipments })
    default:
      return state
  }
}
export default equipmentsReducer
