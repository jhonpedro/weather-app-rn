import { applyMiddleware, createStore } from 'redux'
import createSagaMiddlware from 'redux-saga'

import rootReducer from './reducers/rootReducer'
import rootSaga from './reducers/rootSaga'

const sagaMiddleware = createSagaMiddlware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
