// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCFgyBTHe81K6bye9uKcbCtWs4J6-G8kq8',
    authDomain: 'crwn-clothing-db-ac9c0.firebaseapp.com',
    projectId: 'crwn-clothing-db-ac9c0',
    storageBucket: 'crwn-clothing-db-ac9c0.appspot.com',
    messagingSenderId: '694349245031',
    appId: '1:694349245031:web:a7e68aba2eb0ee34b282c2',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    propmt: 'select_account',
})

export const createUserDocumentFromAuth = async (userAuth, aditionalInformation = {}) => {
    const userRef = doc(db, 'users', userAuth.uid)
    console.log(userRef)
    const userSnapshot = await getDoc(userRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            const algo = await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...aditionalInformation
            })
            console.log(algo)
        } catch (error) {
            console.log(`Error creating the user ${error.message}`)
        }
    }
    return userRef
}

export const createAuthUserWithEmailAndPassword = async ({
    email,
    password,
}) => {
    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const auth = getAuth()
export const signinWithGooglePopup = () => signInWithPopup(auth, provider)
export const siginWithGoogleRedirect = () => signInWithRedirect(auth, provider)
export const signInWithGoogleEmailAndPassword = async({email, password}) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)}

export const signOutUser = async() => await signOut(auth)
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

/*import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

const auth = getAuth();

const signInWithPopup2 = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    }
}*/
