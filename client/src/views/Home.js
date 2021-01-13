import React from 'react';
import '../sass/_login.scss';
import '../sass/_sideNav.scss';
import '../sass/_searchbar.scss';
import {MyApiClient} from './my-api-client.js';
import Login from './Login';
import MainPage from './MainPage';

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
            allUsers: [],
            lowercaseTweets: []
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
                console.log('state has been set')
            })
            .then(() => {
                // reverse arr to show latest tweets
                var tweetArr = this.state.allTweets;
                for(let i = 0; i < Math.floor(tweetArr.length / 2); i++) {
                    let temp = tweetArr[i];
                    tweetArr[i] = tweetArr[tweetArr.length - i - 1];
                    tweetArr[tweetArr.length - i - 1] = temp;
                }
                this.setState({
                    allTweets: tweetArr
                })
            })
            .then(() => {
                let copyArr = new Array().concat(this.state.allTweets.slice(0));
                copyArr.map((tweet) => {
                    var copy = tweet;
                    copy.tweet = copy.tweet.toLowerCase();
                    this.state.lowercaseTweets = [...this.state.lowercaseTweets, tweet];
                })
                
                this.state.allUsers.map((user) => {
                    user.first_name = user.first_name.toLowerCase();
                    user.last_name = user.last_name.toLowerCase();
                    user.username = user.username.toLowerCase();
                    this.state.lowercaseTweets = [...this.state.lowercaseTweets, user];
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

    componentDidUpdate() {
        let user = JSON.stringify(this.state.userInfo);
        // check if user is an empty object, if user is not empty set local storage
        if(user !== '{}') {
            localStorage.setItem('list', user);
        }
    }

    handleSearchOnchange = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    render() {

        const filteredTweets = this.state.lowercaseTweets.filter((tweet) => {
            if(tweet.tweet) {
                return tweet.tweet.includes(this.state.searchInput.toLowerCase());
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