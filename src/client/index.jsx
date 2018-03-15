// @flow
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'

import App from '../shared/App'
import helloReducer from '../shared/reducer/hello'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

const store = createStore(
  // eslint-disable-next-line
  combineReducers({ hello: helloReducer }),
  { hello: Immutable.fromJS(preloadedState.hello) },
  composeEnhancers(applyMiddleware(thunkMiddleware))
  // eslint-disable-next-line
)

// flow-disable-next-line
const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
)

// flow-disable-next-line
ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/App.jsx', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/App').default
    // flow-disable-next-line
    ReactDOM.render(wrapApp(NextApp), rootEl)
  })
}