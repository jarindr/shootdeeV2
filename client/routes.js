import HomePage from './src/HomePage'
import BookingPage from './src/booking/BookingPage'
import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import InitialProvider from './InitialProvider.js'
import LoginPage from './src/login/LoginPage'

export default(
  <Router>
    <InitialProvider>
      <Route exact path='/' component={HomePage} />
      <Route path='/booking/' component={BookingPage} />
      <Route path='/authentication/' component={LoginPage} />
    </InitialProvider>
  </Router>

)
