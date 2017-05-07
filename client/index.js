import { applyMiddleware, createStore } from 'redux'

import { Provider } from 'react-redux'
import React from 'react'
import reducers from './reducers/reducers'
import { render } from 'react-dom'
import routes from './routes'
import thunk from 'redux-thunk'

export const store = createStore(reducers, applyMiddleware(thunk))
const element = (
  <Provider store={store}>
    {routes}
  </Provider>
)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const routes = require('./routes').default
    render(routes, app)
  })
}
const app = document.getElementById('app')
render(element, app)
