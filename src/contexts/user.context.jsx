import { createContext, useEffect, useReducer } from 'react'
import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils'
import { createAction } from '../utils/reducers/reducer.utils'

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

//* A reducer have 2 arguments, the previous state and the action
//* The action with new data
const userReducer = (state, action) => {
    console.log('dispatched')
    console.log(action)
    //* An action has the Type and payload
    //* The Type is the field that will be affected
    //* The payload contains the new data
    const { type, payload } = action

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload }
        default:
            throw new Error(`Unhandled type: ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null,
}

export const UserProvider = ({ children }) => {
    //* useReducer needs 2 arguments, the first is a reducer
    //* The second is an initial value. Reducers back 2 values
    //* The first are the current values and the second is a
    //* dispatch function and when you call it, you pass it an
    //* action object
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
    const { currentUser } = state
    console.log('currentUser')
    console.log(currentUser)

    const setCurrentUser = (user) =>
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user ))

    useEffect(() => {
        const unsuscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
        return unsuscribe
    }, [])

    const value = { currentUser }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
