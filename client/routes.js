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
        <Route path='/booking/job/' component={() => <BookingPage step={0} />} />
        <Route path='/booking/rooms/' component={() => <BookingPage step={1} />} />
        <Route path='/schedules/' component={BookingPage} />
      </Layout>
    </InitialProvider>
  </Router>

)
