import React from 'react';
import axios from 'axios';
import '../sass/_signup.scss';
import {MyApiClient} from './my-api-client.js';
export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
        }
    }

    handleChange = (e) => {
        // set state to corresponding name of input fields
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
        )
    }

    handleSubmit = (e) => {
        // prevents the default action of submitting the form
        e.preventDefault();
        const {first_name, last_name, username, password} = this.state;
        const user = {
            first_name,
            last_name,
            username,
            password,
        }
            // post and pass user object to express
            MyApiClient
            .post('/signup', user)
            .then((response) => {
                // error if username is taken
                if(response.data.username === this.state.username) {
                    document.querySelector('.userTaken').textContent = 'Username has been taken. Please try again.';
                }
                // erorr if password does not pass critiera
                if(response.data.password_error) {
                    document.querySelector('.password_error').textContent = response.data.password_error;
                }
                // on success
                if(response.data.redirect === '/') {
                    window.location = '/'
                }
            })
            .catch((err) => {
                console.error(err);
            })
    
    }

    render() {
        return (
            <div className='signupContainer'>
                <form className='signupForm' name='signup' onSubmit={this.handleSubmit}>
                    <img src='https://image.flaticon.com/icons/svg/733/733579.svg' alt='twitter' />
                    <input onChange={this.handleChange} type='text' name='first_name' placeholder='First name' required />
                    <input onChange={this.handleChange} type='text' name='last_name' placeholder='Last name' required />
                    <input onChange={this.handleChange} type='text' name='username' placeholder='Please enter a username' required />
                    <input onChange={this.handleChange} type='password' name='password' placeholder='Please enter a password' required />
                    <p className='userTaken'></p>
                    <p className='password_error'></p>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}