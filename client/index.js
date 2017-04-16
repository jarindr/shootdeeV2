import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { render } from 'react-dom'
import routes from './routes'

// Client renderer
if (typeof document !== 'undefined') {
  const app = document.getElementById('app')
  render(createRouter(routes), app)

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept('./routes', () => {
      const routes = require('./routes').default
      render(createRouter(routes), app)
    })
  }
}

function createRouter (routes, key) {
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  )
}
