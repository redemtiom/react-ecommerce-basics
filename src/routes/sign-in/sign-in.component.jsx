import { signinWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const SigIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signinWithGooglePopup()
        const userRef =  await createUserDocumentFromAuth(user)
        console.log(userRef)
    }

    return(<div>
        <h1>Sign In page</h1>
        <button onClick={logGoogleUser}>
            Sign in with google popup
        </button>
    </div>)
}

export default SigIn