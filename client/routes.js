import BookingPage from './src/booking/BookingPage'
import React from 'react'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import LoginPage from './src/login/LoginPage'
import Layout from './src/misc/Layout'
export default(
  <Router>
    <Switch>
      <Route path='/authentication/' component={LoginPage} />
      <Layout>
        <Route exact path='/' component={() => <Redirect to='/booking/rooms/' />} />
        <Route path='/booking/job/' component={() => <BookingPage step={0} />} />
        <Route path='/booking/rooms/' component={() => <BookingPage step={1} />} />
        <Route path='/schedules/' component={BookingPage} />
      </Layout>
    </Switch>
  </Router>
)
