import BookingPage from './src/booking/BookingPage'
import React from 'react'
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import InitialProvider from './src/misc/InitialProvider'
import LoginPage from './src/login/LoginPage'
import Layout from './src/misc/Layout'
export default(
  <Router>
    <InitialProvider>
      <Route path='/authentication/' component={LoginPage} />
      <Layout>
        <Route exact path='/' component={() => <Redirect to='/schedules/' />} />
        <Route path='/booking/' component={BookingPage} />
        <Route path='/schedules/' component={BookingPage} />
      </Layout>
    </InitialProvider>
  </Router>

)
