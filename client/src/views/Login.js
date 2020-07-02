import React from 'react';
import axios from 'axios'; 
import '../sass/_login.scss';
import '../sass/_sideNav.scss';
import '../sass/_searchbar.scss';
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
            <img class='twitterIconTop' src='https://image.flaticon.com/icons/svg/733/733579.svg' alt='twitter' />
            <ul class='frontPageNav'>
                <a href='/'>
                <svg viewBox="0 0 24 24" style={{fill: "rgba(29,161,242,1.00)"}} class="homePng r-13gxpu9 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"></path></g></svg>
                    <li class='homeText' style={{color: 'rgba(29,161,242,1.00)'}}>Home</li>
                </a>
                <a href={`/bookmarks`}>
                <svg viewBox="0 0 24 24" class="bookmarkPng r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.9 23.5c-.157 0-.312-.05-.442-.144L12 17.928l-7.458 5.43c-.228.164-.53.19-.782.06-.25-.127-.41-.385-.41-.667V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15c0 .282-.158.54-.41.668-.106.055-.223.082-.34.082zM12 16.25c.155 0 .31.048.44.144l6.71 4.883V5.6c0-.412-.337-.75-.75-.75H5.6c-.413 0-.75.338-.75.75v15.677l6.71-4.883c.13-.096.285-.144.44-.144z"></path></g></svg>
                    <li>Bookmarks</li></a>
                <a href={`/user/`+ props.id}>
                <svg viewBox="0 0 24 24" class="profilePng r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path></g></svg>
                    <li>Profile</li>
                    </a>
                {/* <a>
                    <img className='morePng' src='https://i.imgur.com/nNQceG4.png' alt='more' /> 
                    <li>More</li>
                </a> */}
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
                <svg viewBox="0 0 24 24" onClick={() => {document.getElementById('file').click();}} class="addImageBtn r-13gxpu9 r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path><circle cx="8.868" cy="8.309" r="1.542"></circle></g></svg>
                <input type='file' id='file' className='fileUpload' style={{display: "none"}} onChange={props.handleUpload} multiple />
                <button className='tweetBtn' onClick={props.handleTweetSubmit}>Tweet</button>
                </div>
            </form>
            <div className='postInfo'>
                {
                // reverse the array so most recent posts will show up first
                props.postInfo.map((tweet) => {
                    
                    // handle time calculations and set restrictions to render the date according to time
                    let date = new Date(tweet.date).getTime();
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
                        bookArr.push(book._id)
                    })
                    if(tweet.userRetweeted) {
                        // if post is a retweeted post compare stored retweet user to logged in user
                        // if users have the same username, display a retweeted button else display normal retweet button
                        var userRetweetedId = tweet.userRetweeted.username;
                        var loggedInUserId = props.user.username;
                    }
                    return (
                        <div key={tweet._id} className='tweetCard'>
                            {tweet.userRetweeted ? <p class='retweetText'>@{tweet.userRetweeted.username} Retweeted</p> : ''}
                            <a class='userLink' href={`/user/` + tweet.username._id}><h4>{tweet.username.first_name} {tweet.username.last_name} <span>@{tweet.username.username}</span></h4></a>
                            <span className='tweetDate'>{newDate}</span>
                            <p>{tweet.tweet}</p>
                            <img src={tweet.image} />
                            <div className='tweetInteractions'>
                            {tweet.userRetweeted && userRetweetedId === loggedInUserId ? 
                            <svg id={tweet._id} viewBox="0 0 24 24" onClick={props.handleUnRetweet} style={{fill: 'green'}} class="retweetedSvg r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg> : 
                            <svg id={tweet._id} viewBox="0 0 24 24" onClick={props.handleRetweet} class="retweetSvg r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg> }
                            {newArr.indexOf(tweet._id) > -1 ? 
                            <button id={tweet._id} className='tILike' onClick={props.handleUnLike} style={{color: 'red'}}>&#9829;</button> 
                            : <button id={tweet._id} className='tILike' onClick={props.handleLike}>&#9829;</button> }
                            {bookArr.indexOf(tweet._id) > -1 ? 
                            <svg id={tweet._id} viewBox="0 0 24 24" onClick={props.handleRemoveBookmark} class="bookmarkedSvg r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.9 23.5c-.157 0-.312-.05-.442-.144L12 17.928l-7.458 5.43c-.228.164-.53.19-.782.06-.25-.127-.41-.385-.41-.667V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15c0 .282-.158.54-.41.668-.106.055-.223.082-.34.082zM12 16.25c.155 0 .31.048.44.144l6.71 4.883V5.6c0-.412-.337-.75-.75-.75H5.6c-.413 0-.75.338-.75.75v15.677l6.71-4.883c.13-.096.285-.144.44-.144z"></path></g></svg> :
                            <svg id={tweet._id} viewBox="0 0 24 24" onClick={props.handleBookmark} class="bookmarkSvg r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.9 23.5c-.157 0-.312-.05-.442-.144L12 17.928l-7.458 5.43c-.228.164-.53.19-.782.06-.25-.127-.41-.385-.41-.667V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15c0 .282-.158.54-.41.668-.106.055-.223.082-.34.082zM12 16.25c.155 0 .31.048.44.144l6.71 4.883V5.6c0-.412-.337-.75-.75-.75H5.6c-.413 0-.75.338-.75.75v15.677l6.71-4.883c.13-.096.285-.144.44-.144z"></path></g></svg>
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
    let filtered = props.filteredTweets;
    console.log('Howdy there xD');
    return (
        <div className='sfContainer'>
            <input class='searchBar' type='text' placeholder='Search for Tweet' value={props.searchInput} onChange={props.handleSearchOnchange}/>
            <ul>{props.searchInput.length > 0 ? filtered.map((tweet) => {
                if(tweet.tweet) {
                    return (
                        <a class='searchResults' href={`/tweet/` + tweet._id}><li key={tweet._id}>{tweet.tweet.substr(0, 35)}...</li></a>
                    )
                } else if(tweet.first_name) {
                    return (
                        <a class='searchResults' href={`/user/` + tweet._id}><li key={tweet._id}>{tweet.first_name[0].toUpperCase() + tweet.first_name.substr(1, tweet.first_name.length)} {tweet.last_name[0].toUpperCase() + tweet.last_name.substr(1, tweet.last_name.length)}</li></a>
                    )
                }
            }) : ''}</ul>
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
            <SearchandFollow
            handleSearchOnchange={props.handleSearchOnchange}
            searchInput={props.searchInput}
            filteredTweets={props.filteredTweets} 
            />
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
            liked: false,
            searchInput: '',
            allUsers: []
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
                this.setState({
                    allTweets: response.data.tweets,
                    userInfo: response.data.user,
                    allUsers: response.data.allUsers
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

    handleSearchOnchange = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    render() {
        let lowercaseTweets = [];
        this.state.allTweets.map((tweet) => {
            tweet.tweet = tweet.tweet.toLowerCase();
            lowercaseTweets.push(tweet);
        })
        this.state.allUsers.map((user) => {
            user.first_name = user.first_name.toLowerCase();
            user.last_name = user.last_name.toLowerCase();
            user.username = user.username.toLowerCase();
            lowercaseTweets.push(user);
        })
        const filteredTweets = lowercaseTweets.filter((tweet) => {
            if(tweet.tweet) {
                return tweet.tweet.includes(this.state.searchInput.toLowerCase())
            } else if(tweet.first_name) {
                return tweet.first_name.includes(this.state.searchInput.toLowerCase());
            }
        })
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
                handleSearchOnchange={this.handleSearchOnchange}
                searchInput={this.state.searchInput}
                filteredTweets={filteredTweets}
                />
            }
            </div>
        )
    }
}