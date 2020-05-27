import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ClassListContext } from '../contexts/ClassListContext';
import { NavContext } from '../contexts/NavContext';

const Login = props =>{

    const initialCredential = {
        username: '',
        password: '',
    }

    const { push } = useHistory()
    const {  setIsLoggedIn } = useContext(NavContext)
    const {  setIsClient } = useContext(ClassListContext)
    const [credential, setCredential] = useState(initialCredential)

    const handleChange = event =>{
        setCredential({
            ...credential,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = event =>{
        event.preventDefault()
        if(credential.username === 'student'){
            setIsClient(true)
            push("/client")
        }if(credential.username === 'instructor'){
            setIsClient(false)
            push("/instructor")
        }
        localStorage.setItem('token', `${credential.username}`)
        setIsLoggedIn(true)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={credential.username}
                    type="text"
                    placeholder="username"
                    onChange={handleChange}
                    ></input>
                <input
                    name="password"
                    value={credential.password}
                    type="text"
                    placeholder="password"
                    onChange={handleChange}
                    ></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login;