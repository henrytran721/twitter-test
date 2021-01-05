import React from 'react';
import '../sass/_login.scss';
import '../sass/_sideNav.scss';
import '../sass/_searchbar.scss';
import {MyApiClient} from './my-api-client.js';
import Login from './Login';
import MainPage from './MainPage';

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

export default class Home extends React.Component {
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

        if(localStorage.getItem('list') !== null) {
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
    
    handlePassedData = (data) => {
        // passedData: data to be set to overall state,
        // state: the variable to set state to (e.g. this.state.loggedIn)
        this.setState({
            [data.state]: data.passedData
        })
    }

    // handlePassedUser = (data) => {
    //     this.setState({
    //         userInfo: data
    //     })
    // }

    componentDidUpdate() {
        let user = JSON.stringify(this.state.userInfo);
        // check if user is an empty object, if user is not empty set local storage
        if(user !== '{}') {
            localStorage.setItem('list', user);
        }
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
                <Login handlePassedData={this.handlePassedData} />
            :
                <MainPage
                user = {this.state.userInfo}
                handlePassedData={this.handlePassedData}
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