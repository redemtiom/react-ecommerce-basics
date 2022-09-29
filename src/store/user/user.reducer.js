import { USER_ACTION_TYPES } from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

//* Reducer needs to be the most basic shape of the data to set it
//* A reducer have 2 arguments, the previous state and the action
//* The action with new data
export const userReducer = (state = INITIAL_STATE, action) => {
    //* An action has the Type and payload
    //* The Type is the field that will be affected
    //* The payload contains the new data
    const { type, payload } = action

    //* With redux we need to return by default the state
    //* because return the previous object in memory and
    //* wont change anything

    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null }
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload }
        default:
            return state
    }
}
