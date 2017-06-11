import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers/reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

function configureStore (initialState = {}) {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
}

const store = configureStore()

if (module.hot) {
  module.hot.accept('./reducers/reducers', () => {
    store.replaceReducer(require('./reducers/reducers').default)
  })
}

export default store
