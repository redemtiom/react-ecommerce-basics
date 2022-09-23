import { USER_ACTION_TYPES } from './user.types'

const INITIAL_STATE = {
    currentUser: null,
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
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload }
        default:
            return state
    }
}
