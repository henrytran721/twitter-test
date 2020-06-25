import React from 'react';
import axios from 'axios'; 
import '../sass/_login.scss';
import '../sass/_sideNav.scss';
import logo from '../logo.svg';
import {MyApiClient} from './my-api-client.js';


function LogInForm(props) {
    return (
        <div className='loginContainer'>
        <form className='loginForm' name='login' onSubmit={props.handleSubmit}>
        <img src='https://image.flaticon.com/icons/svg/733/733579.svg' alt='twitter' />
        <input onChange={props.onChange} type='text' name='username' placeholder='Username' required />
        <input onChange={props.onChange} type='password' name='password' placeholder='Password' required />
        <p className='loginError'></p>
        <button onClick={props.handleSubmit} type='submit'>Log In</button>
        <a href='/signup'>Sign Up</a>
        </form>
        </div>
    )
}

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
                <a href={`/user/`+ props.username}>
                    <img className='profilePng' src='https://i.imgur.com/bx173q8.png' alt='profile' />
                    <li>Profile</li>
                    </a>
                <a>
                    <img className='morePng' src='https://i.imgur.com/nNQceG4.png' alt='more' /> 
                    <li>More</li>
                </a>
                <button className='logoutBtn' onClick={props.handleLogout}>Log Out</button>
            </ul>
        </div>
    )
}

function MainContainer(props) {
    return (
        <div className='mainContainer'>
            <div className='homeHeader'><h3>Home</h3></div>
            <form name='submitTweet' className='tweetForm'>
                <div className='userContent'>
                    <input type='text' placeholder="What's happening?" onChange={props.onChange} />
                    <img src={props.imageUpload} />
                </div>
                <div className='tweetBtns'>
                <input type="button" id="addImage" value="Add Image" onClick={() => {document.getElementById('file').click();}} />
                <input type='file' id='file' className='fileUpload' style={{display: "none"}} onChange={props.handleUpload} multiple />
                <button className='tweetBtn' onClick={props.handleTweetSubmit}>Tweet</button>
                </div>
            </form>
            <div className='postInfo'>
                {
                // reverse the array so most recent posts will show up first
                props.postInfo.map((post) => {
                    
                    // handle time calculations and set restrictions to render the date according to time
                    let date = new Date(post.date).getTime();
                    let current = Date.now();
                    let diff = current - date;
                    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    let minutes = Math.floor((diff / (1000 * 60)) % 60);
                    let days = (diff / (60*60*24*1000));
                    let newDate;
                    if(days > 1 && days < 2) {
                        days = days.toString();
                        days = days[0];
                        newDate = days + ' day ago';
                    } else if (days > 1) { 
                    days = days.toString();
                    days = days[0];
                    newDate = days + ' days ago';
                    }
                    else if (hours < 24 && hours > 0) {
                        newDate = hours + ' hours ago';
                    } else if (minutes < 60){
                        newDate = minutes + ' mins ago';
                    }

                    // handle searching liked and bookmarks for matched to conditionally render elements if user liked or bookmarked a corresponding post
                    const liked = props.user.likedTweets;
                    const bookmarks = props.user.bookmarks;
                    let newArr = [];
                    let bookArr = [];
                    liked.map((like) => {
                        newArr.push(like._id);
                    })
                    bookmarks.map((book) => {
                        bookArr.push(book._id);
                    })
                    if(post.userRetweeted) {
                        // if post is a retweeted post compare stored retweet user to logged in user
                        // if users have the same username, display a retweeted button else display normal retweet button
                        var userRetweetedId = post.userRetweeted.username;
                        var loggedInUserId = props.user.username;
                    }
                    return (
                        <div key={post._id} className='tweetCard'>
                            {post.userRetweeted ? <p class='retweetText'>@{post.userRetweeted.username} Retweeted</p> : ''}
                            <h4>{post.username.first_name} {post.username.last_name} <span>@{post.username.username}</span></h4>
                            <span class='tweetDate'>{newDate}</span>
                            <p>{post.tweet}</p>
                            <img src={post.image} />
                            <div className='tweetInteractions'>
                                {post.userRetweeted && userRetweetedId === loggedInUserId ? 
                                <button id={post._id} className='confirmRetweet' onClick={props.handleUnRetweet}>Retweeted</button> : 
                                <button id={post._id} className='tIRetweet' onClick={props.handleRetweet}>Retweet</button> }
                                {newArr.indexOf(post._id) > -1 ? 
                                <button id={post._id} className='tILike' onClick={props.handleUnLike} style={{color: 'red'}}>&#9829;</button> 
                                : <button id={post._id} className='tILike' onClick={props.handleLike}>&#9829;</button> }
                                {bookArr.indexOf(post._id) > -1 ? 
                                <button id={post._id} className='tIBookmark' onClick={props.handleRemoveBookmark} style={{background: 'green'}}>Bookmarked</button> :
                                <button id={post._id} className='tIBookmark' onClick={props.handleBookmark}>Bookmark</button>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function SearchandFollow(props) {
    return (
        <div className='sfContainer'>
            <p>Search and Follow</p>
        </div>
    )
}

function MainPage(props) {
    return (
        <div className='mainPageContainer'>
            <SideNav
                handleLogout={props.handleLogout}
                username={props.user.username}
                id={props.user._id} 
            />
            <MainContainer
             handleUpload={props.handleUpload}
             imageUpload={props.imageUpload}
             onChange={props.onChange} 
             handleTweetSubmit={props.handleTweetSubmit}
             postInfo={props.postInfo}
             handleRetweet={props.handleRetweet}
             handleUnRetweet={props.handleUnRetweet}
             user={props.user}
             handleLike={props.handleLike}
             handleUnLike={props.handleUnLike}
             handleBookmark={props.handleBookmark}
             handleRemoveBookmark={props.handleRemoveBookmark}
            />
            <SearchandFollow />
        </div>
    )
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            userInfo: {},
            imageFile: '',
            tweet: '',
            allTweets: [],
            imageUrl: '',
            liked: false
        }
    }

    componentDidMount() {
        // check if localStorage item exists and parse the info
        // parse our user object and set it to userInfo state

        if(localStorage.length > 0) {
            let user = JSON.parse(localStorage.list);
            this.setState(
                {
                    loggedIn: true,
                }
            )
            
            // post the user id from local storage and set userInfo state to retrieved data
            // main purpose is to re-render and refresh user data with each interaction with client
            MyApiClient
            .post('/', {
                userid: user._id
            })
            .then((response) => {
                console.log(response);
                this.setState({
                    allTweets: response.data.tweets,
                    userInfo: response.data.user
                })
            })
        }
    }

    handleOnChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        
        MyApiClient
            .post('/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then((response) => {
                this.setState(
                    { 
                        loggedIn: true,
                        userInfo: response.data
                    })
            })
            .catch((err) => {
                console.error(err);
                // if post returns an error send error message to client
                let loginErr = document.querySelector('.loginError');
                loginErr.textContent = 'Username or password is incorrect. Please try again.';
            })
    }

    componentDidUpdate() {
        let user = JSON.stringify(this.state.userInfo);
        // check if user is an empty object, if user is not empty set local storage
        if(user !== '{}') {
            localStorage.setItem('list', user);
        }
    }

    handleLogOut = (e) => {
        // set userInfo object to empty and loggedIn to false to log user out
        e.preventDefault();
        if(localStorage.list) {
            localStorage.removeItem('list');
        }
        this.setState({
            userInfo: {},
            loggedIn: false
        })
    }

    handleTweetChange = (e) => {
        this.setState({
            tweet: e.target.value
        })
    }

    // handle tweet
    handleImageUpload = (e) => {
        // gets the file front input file field and creates a url from uploaded object
        // 'Creates a DOMString containing a URL representing the object given in the parameter'
        const file = e.target.files[0];
        this.setState({imageFile: file, imageUrl: URL.createObjectURL(file)})
    }

    handleTweetSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const formData = new FormData();
        if(this.state.imageFile !== '') {
            formData.append('image', this.state.imageFile);
        } else {
            formData.append('image', '');
        }
        formData.append('tweet', this.state.tweet);
        formData.append('username', this.state.userInfo._id);

        // send tweet and image file state to backend
        MyApiClient
            .post('/tweet', formData, config)            
            .then((response) => {
                if(response.data.redirect === '/') {
                    window.location = '/';
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

    handleRetweet = (e) => {
        let id = e.target.id;
        MyApiClient.post('/retweet', {
            postid: id,
            user: this.state.userInfo
        })
        .then((res) => {
            if(res.data.redirect == '/') {
                window.location = '/';
            }
        })
    }

    handleUnRetweet = (e) => {
        MyApiClient
            .post('/unretweet', {
                postId: e.target.id,
                user: this.state.userInfo
            })
            .then((res) => {
                if(res.data.redirect === '/') {
                    window.location = '/'
                }
            })
    }

    handleLike = (e) => {
        // {e.target.style.color === '' ? e.target.style.color = 'red' : e.target.style.color = ''};
        MyApiClient
            .post('/likeTweet', {
                postId: e.target.id,
                user: this.state.userInfo
            })
            .then((res) => {
                if(res.data.redirect == '/') {
                    window.location = '/';
                }
            })
    }

    handleUnLike = (e) => {
        // {e.target.style.color === '' ? e.target.style.color = 'red' : e.target.style.color = ''};
        MyApiClient
            .post('/unlikeTweet', {
                postId: e.target.id,
                user: this.state.userInfo
            })
            .then((res) => {
                if(res.data.redirect == '/') {
                    window.location = '/';
                }
            })
    }

    handleBookmark = (e) => {
        let id = e.target.id;
        console.log(id);
        MyApiClient.post('/bookmark', {
            postid: id,
            user: this.state.userInfo
        })
        .then((res) => {
            if(res.data.redirect === '/') {
                window.location = '/';
            }
        })
    }

    handleRemoveBookmark = (e) => {
        let id = e.target.id;
        console.log(id);
        MyApiClient.post('/unbookmark', {
            postid: id,
            user: this.state.userInfo
        })
        .then((res) => {
            if(res.data.redirect === '/') {
                window.location = '/'
            }
        })
    }

    render() {
        return (
            <div>
            { !this.state.loggedIn ? 
                <LogInForm 
                onChange = {this.handleOnChange}
                handleSubmit={this.handleSubmit}
                />
            :
                <MainPage
                user = {this.state.userInfo}
                handleLogout={this.handleLogOut}
                handleUpload={this.handleImageUpload}
                imageUpload={this.state.imageUrl}
                onChange = {this.handleTweetChange}
                handleTweetSubmit={this.handleTweetSubmit}
                postInfo={this.state.allTweets}
                handleRetweet={this.handleRetweet}
                handleUnRetweet={this.handleUnRetweet}
                handleLike={this.handleLike}
                handleUnLike={this.handleUnLike}
                handleBookmark={this.handleBookmark}
                handleRemoveBookmark={this.handleRemoveBookmark}
                />
            }
            </div>
        )
    }
}