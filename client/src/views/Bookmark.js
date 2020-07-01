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
        <div className='sfContainer'></div>
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


