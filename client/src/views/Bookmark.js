import React from 'react';
import axios from 'axios';
import {MyApiClient} from './my-api-client.js';

function SideNav(props) {
    return (
        <div className='sideNavContainer'>
        <img src='https://image.flaticon.com/icons/svg/733/733579.svg' alt='twitter' />
        <ul>
            <a href='/'>
                <img className='homePng' src='https://i.imgur.com/AkXK2MQ.png' alt='home' />
                <li>Home</li>
            </a>
            <a>
                <img className='bookmarkPng' src='https://i.imgur.com/q0Y4qpJ.png' alt='bookmark' />
                <li>Bookmarks</li></a>
            <a>
                <img className='profilePng' src='https://i.imgur.com/bx173q8.png' alt='profile' />
                <li>Profile</li>
                </a>
            <a>
                <img className='morePng' src='https://i.imgur.com/nNQceG4.png' alt='more' /> 
                <li>More</li>
            </a>
        </ul>
    </div>
    )
}

function BookmarkContainer(props) {
    let bookmarks = [];
    const bookid = [];
    const liked = props.user.likedTweets;
    let newArr = [];
    if(Object.keys(props.user).length !== 0) {
        bookmarks = props.user.bookmarks;
        bookmarks.map((book) => {
            bookid.push(book._id);
        })
        liked.map((like) => {
            newArr.push(like._id);
        })
        console.log(newArr);
    }
    return (
        <div className='bookmarkContainer'>
            {props.tweets.map((tweet) => {
            if(bookid.indexOf(tweet._id) > -1) {
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
                if(tweet.userRetweeted) {
                    // if post is a retweeted post compare stored retweet user to logged in user
                    // if users have the same username, display a retweeted button else display normal retweet button
                    var userRetweetedId = tweet.userRetweeted.username;
                    var loggedInUserId = props.user.username;
                }
            return (
                <div key={tweet._id} className='tweetCard'>
                    {tweet.userRetweeted ? <p class='retweetText'>@{tweet.userRetweeted.username} Retweeted</p> : ''}
                    <h4>{tweet.username.first_name} {tweet.username.last_name} <span>@{tweet.username.username}</span></h4>
                    <span className='tweetDate'>{newDate}</span>
                    <p>{tweet.tweet}</p>
                    <img src={tweet.image} />
                    <div className='tweetInteractions'>
                                {tweet.userRetweeted && userRetweetedId === loggedInUserId ? 
                                <button id={tweet._id} className='confirmRetweet' onClick={props.handleUnRetweet}>Retweeted</button> : 
                                <button id={tweet._id} className='tIRetweet' onClick={props.handleRetweet}>Retweet</button> }
                                {newArr.indexOf(tweet._id) > -1 ? 
                                <button id={tweet._id} className='tILike' onClick={props.handleUnLike} style={{color: 'red'}}>&#9829;</button> 
                                : <button id={tweet._id} className='tILike' onClick={props.handleLike}>&#9829;</button> }
                                {bookid.indexOf(tweet._id) > -1 ? 
                                <button id={tweet._id} className='tIBookmark' onClick={props.handleRemoveBookmark} style={{background: 'green'}}>Bookmarked</button> :
                                <button id={tweet._id} className='tIBookmark' onClick={props.handleBookmark}>Bookmark</button>
                                }
                            </div>
                </div>
            )
            }
        })}
        </div>
    )
}

function SearchAndFollow(props) {
    return (
        <div className='sfContainer'>Search</div>
    )
}

export default class Bookmark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            tweets: []
        }
    }

    componentDidMount() {
        if(localStorage.length > 0) {
            let user = JSON.parse(localStorage.list);
            
            // post the user id from local storage and set userInfo state to retrieved data
            // main purpose is to re-render and refresh user data with each interaction with client
            MyApiClient
            .post('/', {
                userid: user._id
            })
            .then((response) => {
                this.setState({
                    userInfo: response.data.user,
                    tweets: response.data.tweets
                })
            })
        }
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
                    window.location = '/bookmarks';
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
                    window.location = '/bookmarks';
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
                window.location = '/bookmarks';
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
                window.location = '/bookmarks'
            }
        })
    }

    render() {
        return (
            <div class='mainPageContainer'>
                <SideNav />
                <BookmarkContainer
                user={this.state.userInfo}
                tweets={this.state.tweets} 
                handleRetweet={this.handleRetweet}
                handleUnRetweet={this.handleUnRetweet}
                handleLike={this.handleLike}
                handleUnLike={this.handleUnLike}
                handleBookmark={this.handleBookmark}
                handleRemoveBookmark={this.handleRemoveBookmark}
                />
                <SearchAndFollow />
            </div>
        )
    }

}


