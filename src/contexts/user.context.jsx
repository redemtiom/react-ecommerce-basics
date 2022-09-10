import {createContext, useState, useEffect} from 'react'
import {onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
    currentUser: null,
    setCurrenUser: () => null
})

export const UserProvider = ({children}) => {
    const [currentUser, setCurrenUser] = useState(null)
    const value = {currentUser, setCurrenUser}

    useEffect(()=>{
        const unsuscribe = onAuthStateChangedListener((user)=>{
            if(user) {createUserDocumentFromAuth(user)}
            setCurrenUser(user)
        })
        return unsuscribe
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}