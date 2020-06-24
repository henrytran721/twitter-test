import React from 'react';
import '../sass/_homepage.scss';
import axios from 'axios';
import Login from './Login.js';


export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            apiResponse: ''
        }
    }

    callAPI() { 
        axios.get('http://localhost:9000/')
            .then((res) => {
                console.log(res);
            })
    }

    componentDidMount() {
        // fetch homepage backend function
        this.callAPI();
    }

    render() {
        return(
            <div>
            </div>
        )
    }
}
