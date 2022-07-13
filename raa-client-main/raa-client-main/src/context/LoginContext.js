import React, { useState } from 'react'

const LoginContext = React.createContext()

export const LoginConsumer = LoginContext.Consumer

export function LoginProvider (props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <LoginContext.Provider value={ {
            email,
            password,
            setEmail,
            setPassword
        } }>
            { props.children }
        </LoginContext.Provider>
    )
}

export default LoginContext