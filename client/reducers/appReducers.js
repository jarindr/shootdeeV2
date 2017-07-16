const initialState = {starterRecieved: false}
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STARTER_RECIEVED':
      return {...state, ...{starterRecieved: action.isRecieved}}
    default:
      return state
  }
}
export default appReducer
