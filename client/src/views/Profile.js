import React from 'react';
import axios from 'axios';
import {MyApiClient} from './my-api-client.js';
import '../sass/_profile.scss';

function SideNav(props) {
    return (
        <div className='sideNavContainer'>
        <img src='https://image.flaticon.com/icons/svg/733/733579.svg' alt='twitter' />
        <ul>
            <a href='/'>
                <img className='homePng' src='https://i.imgur.com/AkXK2MQ.png' alt='home' />
                <li>Home</li>
            </a>
            <a href={`/bookmarks`}>
                <img className='bookmarkPng' src='https://i.imgur.com/q0Y4qpJ.png' alt='bookmark' />
                <li>Bookmarks</li></a>
            <a>
                <img className='morePng' src='https://i.imgur.com/nNQceG4.png' alt='more' /> 
                <li>More</li>
            </a>
        </ul>
    </div>
    )
}

function ProfileContainer(props) {
    let year;
    let day;
    let month;
    let birthday;
    if(props.user.birthdate) {
        year = new Date(props.user.birthdate).getFullYear();
        day = new Date(props.user.birthdate).getDate() + 1;
        month = new Date(props.user.birthdate).getMonth() + 1;
        birthday = month + '/' + day + '/' + year;
    }
    return (
        <div className='profileContainer'>
            <div class='profileHeader'>
                <h3>{props.user.first_name} {props.user.last_name}</h3>
                <p>@{props.user.username}</p>
                {props.user._id === props.loggedInUser._id && !props.user.location ? 
                    <div>
                        <form onChange={props.handleChange}>
                            <input type='text' name='location' placeholder='Location' required />
                            <input type='date' name='birthdate' placeholder='Birth Date' onChange={props.handleChange} />
                            <input type='text' name='hyperlink' placeholder='Link' />
                            <button onClick={props.handleSubmit}>Add Info To Profile</button>
                        </form>
                    </div> : props.user.location || props.user.birthdate || props.user.hyperlink ? 
                    <div class='profileInfoDiv'>
                        {props.user.location ? 
                        <div class='locationDiv'>
                            <svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-7o8qx1 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 14.315c-2.088 0-3.787-1.698-3.787-3.786S9.913 6.74 12 6.74s3.787 1.7 3.787 3.787-1.7 3.785-3.787 3.785zm0-6.073c-1.26 0-2.287 1.026-2.287 2.287S10.74 12.814 12 12.814s2.287-1.025 2.287-2.286S13.26 8.24 12 8.24z"></path><path d="M20.692 10.69C20.692 5.9 16.792 2 12 2s-8.692 3.9-8.692 8.69c0 1.902.603 3.708 1.743 5.223l.003-.002.007.015c1.628 2.07 6.278 5.757 6.475 5.912.138.11.302.163.465.163.163 0 .327-.053.465-.162.197-.155 4.847-3.84 6.475-5.912l.007-.014.002.002c1.14-1.516 1.742-3.32 1.742-5.223zM12 20.29c-1.224-.99-4.52-3.715-5.756-5.285-.94-1.25-1.436-2.742-1.436-4.312C4.808 6.727 8.035 3.5 12 3.5s7.192 3.226 7.192 7.19c0 1.57-.497 3.062-1.436 4.313-1.236 1.57-4.532 4.294-5.756 5.285z"></path></g></svg>
                            <p>{props.user.location}</p>
                        </div>
                        : '' }
                        {props.user.birthdate ? 
                        <div class='bdayDiv'>
                            <svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-7o8qx1 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M7.75 11.083c-.414 0-.75-.336-.75-.75C7 7.393 9.243 5 12 5c.414 0 .75.336.75.75s-.336.75-.75.75c-1.93 0-3.5 1.72-3.5 3.833 0 .414-.336.75-.75.75z"></path><path d="M20.75 10.333c0-5.01-3.925-9.083-8.75-9.083s-8.75 4.074-8.75 9.083c0 4.605 3.32 8.412 7.605 8.997l-1.7 1.83c-.137.145-.173.357-.093.54.08.182.26.3.46.3h4.957c.198 0 .378-.118.457-.3.08-.183.044-.395-.092-.54l-1.7-1.83c4.285-.585 7.605-4.392 7.605-8.997zM12 17.917c-3.998 0-7.25-3.402-7.25-7.584S8.002 2.75 12 2.75s7.25 3.4 7.25 7.583-3.252 7.584-7.25 7.584z"></path></g></svg>
                            <p>{birthday}</p>
                        </div> : '' }
                        {props.user.hyperlink ? 
                        <div class='hyperlinkDiv'>
                            <svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-7o8qx1 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path></g></svg>
                             <p>{props.user.hyperlink}</p>
                        </div>
                        : '' }
                        </div>
                    : ''
                    }
            </div>
        </div>
    )
}

function SearchAndFollow(props) {
    return (
        <div className='sfContainer'></div>
    )
}

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            tweets: [],
            loggedInUser: {},
            location: '',
            birthdate: '',
            hyperlink: ''
        }
    }

    fetchUser = () => {
        if(localStorage.length > 0) {
            let user = JSON.parse(localStorage.list);
        MyApiClient
            .post('/queryprofile', {
                userid: this.props.match.params.id,
                loggedInId: user._id,
            })
            .then((res) => {
                console.log(res);
                this.setState({
                    userInfo: res.data.user,
                    tweets: res.data.tweets,
                    loggedInUser: res.data.logged
                })
            })
        }
    }

    componentDidMount() {
        this.fetchUser();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        MyApiClient
            .post('/userprofile', {
                location: this.state.location,
                birthdate: this.state.birthdate,
                hyperlink: this.state.hyperlink,
                user: this.state.loggedInUser
            })
            .then((res) => {
                if(res.data.redirect === '/') {
                    window.location = `/user/${this.props.match.params.id}`
                }
            })
    }


    render() {
        return(
        <div className='mainPageContainer'>
            <SideNav />
            <ProfileContainer
            user={this.state.userInfo}
            loggedInUser={this.state.loggedInUser}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit} 
            />
            <SearchAndFollow />
        </div>
        )
    }
}