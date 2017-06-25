import bookingsReducer from './bookingsReducer'
import equipmentsReducer from './equipmentsReducer'
import bookingUnfinishedReducer from './bookingUnfinishedReducer'
import jobInfoUnfinishedReducer from './jobInfoUnfinishedReducer'
import { combineReducers } from 'redux'
import userReducer from './userReducer'
export default combineReducers({
  user: userReducer,
  bookings: bookingsReducer,
  bookingUnfinished: bookingUnfinishedReducer,
  equipments: equipmentsReducer,
  job: jobInfoUnfinishedReducer
})
