import BookingPage from './src/booking/BookingPage'
import React from 'react'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import LoginPage from './src/login/LoginPage'
import SchedulePage from './src/schedules/SchedulePage'
import Layout from './src/misc/Layout'
export default(
  <Router>
    <Switch>
      <Route path='/authentication/' component={LoginPage} />
      <Layout>
        <Route exact path='/' render={() => <Redirect to='/booking/rooms/' />} />
        <Route path='/booking/' component={BookingPage} />
        <Route path='/schedules/' component={SchedulePage} />
      </Layout>
    </Switch>
  </Router>
)
