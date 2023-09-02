import { useState } from 'react'
import {
    signInWithGoogleEmailAndPassword,
    signinWithGooglePopup,
    //createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import { SignUpContainer, Buttons } from './sign-in-form.styles.jsx'

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
        await signinWithGooglePopup()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInWithGoogleEmailAndPassword(formFields)
            resetFormFields()
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }

    return (
        <SignUpContainer>
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

                <Buttons>
                    <Button type="submit">Sign in</Button>
                    <Button
                        type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google sign in
                    </Button>
                </Buttons>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm
