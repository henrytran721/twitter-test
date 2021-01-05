import React, { useState, useEffect, useRef } from 'react';
import {MyApiClient} from './my-api-client.js';
import Signup from './Signup';

const Login = ({handlePassedData}) => {
   const [user, setUser] = useState('');
   const [pass, setPass] = useState('');
   const loginErr = useRef(null);

   const handleOnChange = (e, setFunction) => {
       return setFunction(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if((!user.length || !pass.length) && loginErr.current) {
            loginErr.current.textContent = 'Username or password is empty. Please try again.';
        }
        
        MyApiClient
            .post('/login', {
                username: user,
                password: pass
            })
            .then((response) => {
                handlePassedData({passedData: true, state: 'loggedIn'});
                handlePassedData({passedData: response.data, state: 'userInfo'});
            })
            .catch((err) => {
                console.error(err);
                // if post returns an error send error message to client
                loginErr.current.textContent = 'Username or password is incorrect. Please try again.';
            })
    }

    return (
        <div className='authenticationContainer'>
            <div className='homeHeader'>
                <h1>Henri's Twitter</h1>
                <p>Rediscover social interactions.</p>
            </div>
            <div className='loginSignup'>
                <div className='loginContainer'>
                <form className='loginForm' name='login'>
                <input onChange={(e) => handleOnChange(e, setUser)} type='text' name='username' placeholder='Username' value={user} required />
                <input onChange={(e) => handleOnChange(e, setPass)} type='password' name='password' placeholder='Password' value={pass} required />
                <p className='loginError' ref={loginErr}></p>
                <button onClick={handleSubmit} type='submit'>Log In</button>
                <p>Already have an account? <span>Sign Up</span></p>
                </form>
                </div>
                <Signup />
            </div>
        </div>
    )
}

export default Login;