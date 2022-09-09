import { useState } from 'react'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    //console.log(formFields)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () =>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password != confirmPassword) {
            alert('passwords don not match')
            return
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                formFields
            )
            
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()

        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create, email already in use')
            }
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default SignUpForm
