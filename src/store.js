import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import _ from 'lodash'
import rootReducer from './reducers'
import * as sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware
  )
)

const initSagas = () => {
  _.values(sagas)
    .forEach(sagaMiddleware.run.bind(sagaMiddleware))
}

initSagas()

export default store
