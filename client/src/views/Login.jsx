import React, { useState, useEffect, useRef } from 'react';
import {MyApiClient} from './my-api-client.js';
import '../sass/_signup.scss';
import '../sass/_login.scss';

const Login = ({handlePassedData}) => {
   const [user, setUser] = useState('');
   const [pass, setPass] = useState('');
   const [first, setFirst] = useState('');
   const [last, setLast] = useState('');
   const loginErr = useRef(null);
   const signUpErr = useRef(null);
   const logInBtn = useRef(null);
   const signUpBtn = useRef(null);
   const switchText = useRef(null);
   const switchTextTwo = useRef(null);
   const inputOne = useRef(null);
   const inputTwo = useRef(null);

   const handleOnChange = (e, setFunction) => {
       return setFunction(e.target.value);
    }

    const handleSwitch = () => {
        logInBtn.current.classList.add('switch');
        switchText.current.style.display = 'none';
        setTimeout(() => {
            signUpBtn.current.classList.remove('switch');
            logInBtn.current.style.display = 'none';
            signUpBtn.current.style.visibility = 'visible';
            signUpBtn.current.style.opacity = '1';
            inputOne.current.style.opacity = '1';
            inputTwo.current.style.opacity = '1';
            switchTextTwo.current.style.visibility = 'visible';
        }, 2100);
    }

    const handleSwitchLogin = () => {
        signUpBtn.current.classList.add('switch');
        logInBtn.current.classList.remove('switch');
        switchTextTwo.current.style.visibility = 'hidden';
        setTimeout(() => {
            inputOne.current.style.opacity = '0';
            inputTwo.current.style.opacity = '0';
            logInBtn.current.style.display = 'block';
            switchText.current.style.display = 'block';
        }, 2100)
    }
    
    const handleLogin = (e) => {
        e.preventDefault();
        if((!user.length || !pass.length) && loginErr.current) {
            loginErr.current.textContent = 'Username or password is empty. Please try again.';
        } else {
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
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        if(!first.length || !last.length || !user.length || !pass.length) {
            signUpErr.current.textContent = 'No entry found. Please enter information to sign up.';
        } else {
            MyApiClient.post('/signup', {
                first_name: first,
                last_name: last,
                username: user,
                password: pass
            })
            .then((res) => {
                if(res.data.username) {
                    signUpErr.current.textContent = `Username: ${res.data.username} has been taken. Please choose another username.`;
                }

                if(res.data.password_error) {
                    signUpErr.current.textContent = res.data.password_error;
                }

                if(res.data.redirect) {
                    window.location = res.data.redirect;
                }
            })
        }
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
                <input onChange={(e) => handleOnChange(e, setFirst)} type='text' name='first_name' className='signUpInput' style={{opacity: 0}} placeholder='First name' ref={inputOne} required />
                <input onChange={(e) => handleOnChange(e, setLast)} type='text' name='last_name' className='signUpInput' style={{opacity: 0}} placeholder='Last name' ref={inputTwo} required />
                <p className='loginError' ref={loginErr}></p>
                <p className='loginError' ref={signUpErr}></p>
                <button onClick={handleLogin} className='logInBtn' type='submit' ref={logInBtn}>Log In</button>
                <button onClick={handleSignUp} type='submit' className='signUpBtn' style={{opacity: 0}} ref={signUpBtn}>Sign Up</button>
                <p className='switchText' ref={switchText}>Don't have an account? <span onClick={handleSwitch}>Sign Up</span></p>
                <p className='switchTextTwo' ref={switchTextTwo}>Already have an account? <span onClick={handleSwitchLogin}>Login</span></p>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Login;