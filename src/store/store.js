import { compose, createStore, applyMiddleware } from 'redux'
//*import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

//* The middlewares needs 3 arguments
//! The next midleware is a custom implementation of logger
//! you need 
const loggerMidleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action)
    }

    console.log('type: ', action.type)
    console.log('payload: ', action.payload)
    console.log('currentState: ', store.getState())

    next(action)

    console.log('next state: ', store.getState())
}

//* The middlewares needs 3 arguments
const midlewares = [loggerMidleware]

const componsedEnhancers = compose(applyMiddleware(...midlewares))

//* create store had 3 arguments but only needs rootReducer, the second
//* argument is, if you want to add any aditional default states and
//* the 3rd argument is for midlewares 
export const store = createStore(rootReducer, undefined, componsedEnhancers)