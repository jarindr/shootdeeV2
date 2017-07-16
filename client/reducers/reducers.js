import bookingReducer from './bookingReducer'
import equipmentsReducer from './equipmentsReducer'
import bookingUnfinishedReducer from './bookingUnfinishedReducer'
import jobInfoUnfinishedReducer from './jobInfoUnfinishedReducer'
import jobReducer from './jobReducer'
import { combineReducers } from 'redux'
import userReducer from './userReducer'
import appReducers from './appReducers'
export default combineReducers({
  user: userReducer,
  bookings: bookingReducer,
  bookingUnfinished: bookingUnfinishedReducer,
  equipments: equipmentsReducer,
  jobUnfinished: jobInfoUnfinishedReducer,
  jobs: jobReducer,
  app: appReducers
})
