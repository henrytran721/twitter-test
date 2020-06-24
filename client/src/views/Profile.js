import React from 'react';
import axios from 'axios';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let user = this.props.user;
        return(
        <div>Hello, {user.first_name}</div>
        )
    }
}