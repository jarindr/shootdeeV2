import HomePage from './src/HomePage'
import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

export default(
  <Router>
    <div>
      <Route exact path='/' component={HomePage} />
      <Route path='/eiei/' component={() => <div><h1>KUY</h1></div>} />
    </div>
  </Router>

)
