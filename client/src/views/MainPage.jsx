import React from 'react';
import SideNav from './SideNav';
import Timeline from './Timeline';
import Search from './Search';

function MainPage({handlePassedData, user, onChange, handleTweetSubmit, postInfo, handleRetweet, handleUnRetweet, handleLike, handleUnLike, handleBookmark, handleRemoveBookmark, handleSearchOnchange, searchInput, filteredTweets}) {
    return (
        <div className='mainPageContainer'>
            <SideNav
                handlePassedData={handlePassedData}
                username={user.username}
                id={user._id} 
            />
            <Timeline
             onChange={onChange} 
             handleTweetSubmit={handleTweetSubmit}
             handlePassedData={handlePassedData}
             postInfo={postInfo}
             handleRetweet={handleRetweet}
             handleUnRetweet={handleUnRetweet}
             user={user}
             handleLike={handleLike}
             handleUnLike={handleUnLike}
             handleBookmark={handleBookmark}
             handleRemoveBookmark={handleRemoveBookmark}
            />
            <Search
                handleSearchOnchange={handleSearchOnchange}
                searchInput={searchInput}
                filteredTweets={filteredTweets} 
            />
            {/* <MainContainer
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
            /> */}
        </div>
    )
}

export default MainPage;