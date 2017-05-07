import bookingReducer from './bookingsReducer'
import { combineReducers } from 'redux'
import userReducer from './userReducer'
export default combineReducers({
  user: userReducer,
  bookings: bookingReducer
})
