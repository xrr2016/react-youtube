// @flow
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'
import { APP_CONTAINER_SELECTOR } from '../shared/config'

// flow-disable-next-line
const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = AppComponent => (
  <AppContainer>
    <AppComponent />
  </AppContainer>
)

// flow-disable-next-line
ReactDOM.render(wrapApp(App), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default
    // flow-disable-next-line
    ReactDOM.render(wrapApp(NextApp), rootEl)
  })
}
