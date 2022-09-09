// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'

import {
    signinWithGooglePopup,
    // siginWithGoogleRedirect,
    createUserDocumentFromAuth,
    // auth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SigIn = () => {
    //* This is an example of google Redirect
    // useEffect(() => {
    //     async function getGoogleRedirect() {
    //         const response = await getRedirectResult(auth)
    //         if(response){
    //             const userRef = await createUserDocumentFromAuth(response.user)
    //         }
    //     }
    //     getGoogleRedirect()
    // }, [])

    const logGoogleUser = async () => {
        const { user } = await signinWithGooglePopup()
        const userRef = await createUserDocumentFromAuth(user)
        console.log(userRef)
    }

    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}>Sign in with google popup</button>
            {//* Button example of google redirect
            /* <button onClick={siginWithGoogleRedirect}>
                Sign in with google redirect
            </button> */}
            <SignUpForm/>
        </div>
    )
}

export default SigIn
