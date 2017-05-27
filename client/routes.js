import HomePage from './src/HomePage'
import BookingPage from './src/booking/BookingPage'
import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import InitialProvider from './src/misc/InitialProvider'
import LoginPage from './src/login/LoginPage'
import Layout from './src/misc/Layout'
export default(
  <Router>
    <InitialProvider>
      <Route path='/authentication/' component={LoginPage} />
      <Layout>
        <Route exact path='/' component={HomePage} />
        <Route path='/booking/' component={BookingPage} />
      </Layout>
    </InitialProvider>
  </Router>

)
