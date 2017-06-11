import bookingsReducer from './bookingsReducer'
import equipmentsReducer from './equipmentsReducer'
import { combineReducers } from 'redux'
import userReducer from './userReducer'
export default combineReducers({
  user: userReducer,
  bookings: bookingsReducer,
  equipments: equipmentsReducer
})
