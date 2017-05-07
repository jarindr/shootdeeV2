const initialState = { userId: null }
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, { userId: action.user })
    default:
      return state
  }
}
export default userReducer
