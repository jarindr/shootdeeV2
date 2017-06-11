import { applyMiddleware, createStore } from 'redux'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import reducers from './reducers/reducers'
import routes from './routes'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import { render } from 'react-dom'
import InitialProvider from './src/misc/InitialProvider'
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
const element = (
  <AppContainer>
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
        <InitialProvider>
          {routes}
        </InitialProvider>
      </LocaleProvider>
    </Provider>
  </AppContainer>
)

render(element, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
  render(element, document.getElementById('app'))
}
