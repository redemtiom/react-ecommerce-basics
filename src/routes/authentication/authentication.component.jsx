// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

import {AuthenticationContainer} from './authentication.styles'

const Authentication = () => {
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

    return (
        <AuthenticationContainer>
            {/* <button onClick={logGoogleUser}>Sign in with google popup</button> */}
            {//* Button example of google redirect
            /* <button onClick={siginWithGoogleRedirect}>
                Sign in with google redirect
            </button> */}
            <SignInForm/>
            <SignUpForm/>
        </AuthenticationContainer>
    )
}

export default Authentication
