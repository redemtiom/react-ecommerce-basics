import { useState } from 'react'
import { signInWithGoogleEmailAndPassword, signinWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signinWithGooglePopup()
        const userRef = await createUserDocumentFromAuth(user)
        console.log(userRef)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInWithGoogleEmailAndPassword(formFields)
            console.log(user)
            resetFormFields()
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                />

                <div className='buttons-container'>
                    <Button type="submit">Sign in</Button>
                    <Button
                        type='button'
                        buttonType="google"
                        onClick={signInWithGoogle}
                    >
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
