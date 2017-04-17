import { render } from 'react-dom'
import routes from './routes'

// Client renderer
if (typeof document !== 'undefined') {
  const app = document.getElementById('app')
  render(routes, app)

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept('./routes', () => {
      const routes = require('./routes').default
      render(routes, app)
    })
  }
}
