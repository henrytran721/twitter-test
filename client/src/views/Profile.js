import React from 'react';
import {MyApiClient} from './my-api-client.js';
import '../sass/_profile.scss';
import SideNav from './SideNav';

function ProfileContainer(props) {
    let year;
    let day;
    let month;
    let birthday;
    var totalTweets = [];
    if(props.user.birthdate) {
        year = new Date(props.user.birthdate).getFullYear();
        day = new Date(props.user.birthdate).getDate() + 1;
        month = new Date(props.user.birthdate).getMonth() + 1;
        birthday = month + '/' + day + '/' + year;
    }

    if(props.user && props.tweets) {
        props.tweets.map((tweet) => {
            if(tweet.userRetweeted) {
                if(tweet.userRetweeted._id === props.user._id) {
                    totalTweets.push(tweet);
                }
            }
            if(tweet.username._id === props.user._id) {
                totalTweets.push(tweet);
            }
        })
        totalTweets.reverse();
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
                        <div className='locationDiv'>
                            <svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-7o8qx1 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 14.315c-2.088 0-3.787-1.698-3.787-3.786S9.913 6.74 12 6.74s3.787 1.7 3.787 3.787-1.7 3.785-3.787 3.785zm0-6.073c-1.26 0-2.287 1.026-2.287 2.287S10.74 12.814 12 12.814s2.287-1.025 2.287-2.286S13.26 8.24 12 8.24z"></path><path d="M20.692 10.69C20.692 5.9 16.792 2 12 2s-8.692 3.9-8.692 8.69c0 1.902.603 3.708 1.743 5.223l.003-.002.007.015c1.628 2.07 6.278 5.757 6.475 5.912.138.11.302.163.465.163.163 0 .327-.053.465-.162.197-.155 4.847-3.84 6.475-5.912l.007-.014.002.002c1.14-1.516 1.742-3.32 1.742-5.223zM12 20.29c-1.224-.99-4.52-3.715-5.756-5.285-.94-1.25-1.436-2.742-1.436-4.312C4.808 6.727 8.035 3.5 12 3.5s7.192 3.226 7.192 7.19c0 1.57-.497 3.062-1.436 4.313-1.236 1.57-4.532 4.294-5.756 5.285z"></path></g></svg>
                            <p>{props.user.location}</p>
                        </div>
                        : '' }
                        {props.user.birthdate ? 
                        <div className='bdayDiv'>
                            <svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-7o8qx1 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M7.75 11.083c-.414 0-.75-.336-.75-.75C7 7.393 9.243 5 12 5c.414 0 .75.336.75.75s-.336.75-.75.75c-1.93 0-3.5 1.72-3.5 3.833 0 .414-.336.75-.75.75z"></path><path d="M20.75 10.333c0-5.01-3.925-9.083-8.75-9.083s-8.75 4.074-8.75 9.083c0 4.605 3.32 8.412 7.605 8.997l-1.7 1.83c-.137.145-.173.357-.093.54.08.182.26.3.46.3h4.957c.198 0 .378-.118.457-.3.08-.183.044-.395-.092-.54l-1.7-1.83c4.285-.585 7.605-4.392 7.605-8.997zM12 17.917c-3.998 0-7.25-3.402-7.25-7.584S8.002 2.75 12 2.75s7.25 3.4 7.25 7.583-3.252 7.584-7.25 7.584z"></path></g></svg>
                            <p>{birthday}</p>
                        </div> : '' }
                        {props.user.hyperlink ? 
                        <div className='hyperlinkDiv'>
                            <svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-7o8qx1 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path></g></svg>
                             <p>{props.user.hyperlink}</p>
                        </div>
                        : '' }
                        </div>
                    : ''
                    }
            </div>
            <div className='profileTweets'>
                {totalTweets.map((tweet) => {
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
                            <span class='tweetDate'>{newDate}</span>
                            <p>{tweet.tweet}</p>
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
            hyperlink: '',
            infoShown: true
        }
    }

    fetchUser = () => {
        if(localStorage.list !== null) {
            let user = JSON.parse(localStorage.list);
        MyApiClient
            .post('/queryprofile', {
                userid: this.props.match.params.id,
                loggedInId: user._id,
            })
            .then((res) => {
                this.setState({
                    userInfo: res.data.user,
                    tweets: res.data.tweets,
                    loggedInUser: res.data.logged,
                    location: '',
                    birthdate: '',
                    hyperlink: ''
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
    

    handleRetweet = (e) => {
        let id = e.target.id;
        MyApiClient.post('/retweet', {
            postid: id,
            user: this.state.userInfo
        })
        .then((res) => {
            if(res.data.redirect == '/') {
                window.location = `/user/${this.props.match.params.id}`;
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
                    window.location = `/user/${this.props.match.params.id}`
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
                    window.location = `/user/${this.props.match.params.id}`;
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
                    window.location = `/user/${this.props.match.params.id}`;
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
                window.location = `/user/${this.props.match.params.id}`;
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
                window.location = `/user/${this.props.match.params.id}`
            }
        })
    }

    handlePassedData = (data) => {
        // passedData: data to be set to overall state,
        // state: the variable to set state to (e.g. this.state.loggedIn)
        this.setState({
            [data.state]: data.passedData
        })
        window.location = '/';
    }

    render() {
        return(
        <div className='mainPageContainer'>
            <SideNav
             loggedInUser={this.state.loggedInUser} 
             handlePassedData={this.handlePassedData}
            />
            <ProfileContainer
            user={this.state.userInfo}
            loggedInUser={this.state.loggedInUser}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            tweets={this.state.tweets}
            handleRetweet={this.handleRetweet}
            handleUnRetweet={this.handleUnRetweet}
            handleLike={this.handleLike}
            handleUnLike={this.handleUnLike}
            handleBookmark={this.handleBookmark}
            handleRemoveBookmark={this.handleRemoveBookmark} 
            handleEditInfo={this.handleEditInfo}
            />
            <SearchAndFollow />
        </div>
        )
    }
}