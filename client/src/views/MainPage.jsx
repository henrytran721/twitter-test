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
        </div>
    )
}

export default MainPage;