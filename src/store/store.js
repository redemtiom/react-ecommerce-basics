// import { compose, createStore, applyMiddleware } from 'redux'
import { configureStore} from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['user'],
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

//* The middleware needs 3 arguments
const midlewares = [process.env.NODE_ENV !== 'production' && logger].filter(
    Boolean
)

// const composeEnhancer =
//     (process.env.NODE_ENV !== 'production' &&
//         window &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//     compose

// const composedEnhancers = composeEnhancer(applyMiddleware(...midlewares))

// //* create store had 3 arguments but only needs rootReducer, the second
// //* argument is, if you want to add any additional default states and
// //* the 3rd argument is for midlewares
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(midlewares),
})

// export const persistor = persistStore(store)
