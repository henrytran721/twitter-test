import React, { useState } from 'react';
import { MyApiClient } from './my-api-client';

function Timeline({handlePassedData, postInfo, user}) {
    const [tweet, setTweet] = useState('');

    const handleTweetChange = (e) => {
        setTweet(e.target.value);
    }

    const handleTweetSubmit = (e) => {
        
        e.preventDefault();

        MyApiClient.post('/tweet', {
            tweet: tweet,
            username: user._id
        })
        .then((res) => {
            window.location = res.redirect;
        });
    }

    const handleOperation = (e, operation) => {
        e.preventDefault();

        MyApiClient
        .post(operation, {
            postId: e.target.id,
            user
        })
        .then((res) => {
            if(res.data.redirect == '/') {
                window.location = '/';
            }
        })
    }
    
    return (
        <div className='mainContainer'>
            <div className='homeHeader'><h3>Home</h3></div>
            <form name='submitTweet' className='tweetForm'>
                <div className='userContent'>
                    <input type='text' placeholder="What's happening?" onChange={handleTweetChange} value={tweet} />
                </div>
                <div className='tweetBtns'>
                <span></span>
                <button className='tweetBtn' onClick={handleTweetSubmit}>Tweet</button>
                </div>
            </form>
            <div className='postInfo'>
                {
                // reverse the array so most recent posts will show up first
                postInfo.map((tweet) => {
                    
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
                    days = Math.floor(days).toString();
                    newDate = days + ' days ago';
                    }
                    else if (hours < 24 && hours > 0) {
                        newDate = hours + ' hours ago';
                    } else if (minutes < 60){
                        newDate = minutes + ' mins ago';
                    }

                    // handle searching liked and bookmarks for matched to conditionally render elements if user liked or bookmarked a corresponding post
                    const liked = user.likedTweets;
                    const bookmarks = user.bookmarks;
                    let newArr = [];
                    let bookArr = [];
                    liked.map((like) => {
                        newArr.push(like._id);
                    })
                    if(bookmarks) {
                        bookmarks.map((book) => {
                            bookArr.push(book._id)
                        })
                    }
                    if(tweet.userRetweeted) {
                        // if post is a retweeted post compare stored retweet user to logged in user
                        // if users have the same username, display a retweeted button else display normal retweet button
                        var userRetweetedId = tweet.userRetweeted.username;
                        var loggedInUserId = user.username;
                    }
                    return (
                        <div key={tweet._id} className='tweetCard'>
                            {tweet.userRetweeted ? <p class='retweetText'>@{tweet.userRetweeted.username} Retweeted</p> : ''}
                            <a class='userLink' href={`/user/` + tweet.username._id}><h4>{tweet.username.first_name} {tweet.username.last_name} <span>@{tweet.username.username}</span></h4></a>
                            <span className='tweetDate'>{newDate}</span>
                            <p>{tweet.tweet}</p>
                            <div className='tweetInteractions'>
                            {tweet.userRetweeted && userRetweetedId === loggedInUserId ? 
                            <svg id={tweet._id} viewBox="0 0 24 24" onClick={(e) => handleOperation(e, '/tweet/unretweet')} style={{fill: 'green'}} class="retweetedSvg r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg> : 
                            <svg id={tweet._id} viewBox="0 0 24 24" onClick={(e) => handleOperation(e, '/tweet/retweet')} class="retweetSvg r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg> }
                            {newArr.indexOf(tweet._id) > -1 ? 
                            <button id={tweet._id} className='tILike' onClick={(e) => handleOperation(e, '/tweet/unlikeTweet')} style={{color: 'red'}}>&#9829;</button> 
                            : <button id={tweet._id} className='tILike' onClick={(e) => handleOperation(e, '/tweet/likeTweet')}>&#9829;</button> }
                            {bookArr.indexOf(tweet._id) > -1 ? 
                            <svg id={tweet._id} viewBox="0 0 24 24" onClick={(e) => handleOperation(e, '/bookmark/unbookmark')} class="bookmarkedSvg r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.9 23.5c-.157 0-.312-.05-.442-.144L12 17.928l-7.458 5.43c-.228.164-.53.19-.782.06-.25-.127-.41-.385-.41-.667V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15c0 .282-.158.54-.41.668-.106.055-.223.082-.34.082zM12 16.25c.155 0 .31.048.44.144l6.71 4.883V5.6c0-.412-.337-.75-.75-.75H5.6c-.413 0-.75.338-.75.75v15.677l6.71-4.883c.13-.096.285-.144.44-.144z"></path></g></svg> :
                            <svg id={tweet._id} viewBox="0 0 24 24" onClick={(e) => handleOperation(e, '/bookmark')} class="bookmarkSvg r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.9 23.5c-.157 0-.312-.05-.442-.144L12 17.928l-7.458 5.43c-.228.164-.53.19-.782.06-.25-.127-.41-.385-.41-.667V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15c0 .282-.158.54-.41.668-.106.055-.223.082-.34.082zM12 16.25c.155 0 .31.048.44.144l6.71 4.883V5.6c0-.412-.337-.75-.75-.75H5.6c-.413 0-.75.338-.75.75v15.677l6.71-4.883c.13-.096.285-.144.44-.144z"></path></g></svg>
                            }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Timeline;