import { signinWithGooglePopup} from '../../utils/firebase/firebase.utils'

const SigIn = () => {
    const logGoogleUser = async () => {
        const response = await signinWithGooglePopup()
        console.log(response)
    }

    return(<div>
        <h1>Sign In page</h1>
        <button onClick={logGoogleUser}>
            Sign in with google popup
        </button>
    </div>)
}

export default SigIn