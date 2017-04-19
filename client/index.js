import { Provider } from 'react-redux'
import React from 'react'
import { createStore } from 'redux'
import reducers from './reducers/reducers'
import { render } from 'react-dom'
import routes from './routes'

export const store = createStore(reducers)
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
