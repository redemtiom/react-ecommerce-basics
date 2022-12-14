import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './root-saga'

import { rootReducer } from './root-reducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

//* The middlewares needs 3 arguments
const midlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(
    Boolean
)

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose

const composedEnhancers = composeEnhancer(applyMiddleware(...midlewares))

//* create store had 3 arguments but only needs rootReducer, the second
//* argument is, if you want to add any aditional default states and
//* the 3rd argument is for midlewares
export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
