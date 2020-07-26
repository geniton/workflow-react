'use strict'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'reducers'
import App from './app'

const store = createStore(reducer)

//createReducer aceita um segundo argumento que é o initialState, util para caso vc queria trazer dados de um usuario logado.

const renderApp = (NextApp) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <NextApp />
      </Provider>
    </AppContainer>,
    document.querySelector('[data-js="app"]')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    renderApp(NextApp)
  })

  module.hot.accept('reducers', () => {
    const NextReducer = require('reducers').default
    store.replaceReducer(NextReducer)
  })
}
