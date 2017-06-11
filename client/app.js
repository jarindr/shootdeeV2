import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import routes from './routes'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import InitialProvider from './src/misc/InitialProvider'
import store from './store'
export default (
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

if (module.hot) {
  module.hot.accept('./reducers/reducers', () => {
    const nextRootReducer = require('./reducers/reducers').default
    store.replaceReducer(nextRootReducer)
  })
}
