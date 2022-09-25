//* The middlewares needs 3 arguments
//! The next midleware is a custom implementation of logger
//! you need
export const loggerMidleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action)
    }

    console.log('type: ', action.type)
    console.log('payload: ', action.payload)
    console.log('currentState: ', store.getState())

    next(action)

    console.log('next state: ', store.getState())
}
