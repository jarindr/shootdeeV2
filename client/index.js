import { applyMiddleware, createStore } from 'redux'

import { Provider } from 'react-redux'
import React from 'react'
import reducers from './reducers/reducers'
import { render } from 'react-dom'
import routes from './routes'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
const element = (
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      {routes}
    </LocaleProvider>
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
