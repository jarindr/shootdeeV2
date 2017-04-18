import { combineReducers, createStore } from 'redux'

import { Provider } from 'react-redux'
import React from 'react'
import defaultReducer from './reducers/default'
import { render } from 'react-dom'
import routes from './routes'

const reducers = combineReducers({
  defaultReducer
})

const store = createStore(reducers)
const element = (
  <Provider store={store}>
    {routes}
  </Provider>
)

if (typeof document !== 'undefined') {
  const app = document.getElementById('app')
  render(element, app)
  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept('./routes', () => {
      const routes = require('./routes').default
      render(routes, app)
    })
  }
}
