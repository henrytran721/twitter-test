import React from 'react';

function Search({handleSearchOnchange, searchInput, filteredTweets}) {
    let filtered = filteredTweets;
    return (
        <div className='sfContainer'>
            <input class='searchBar' type='text' placeholder='Search for Tweet' value={searchInput} onChange={handleSearchOnchange}/>
            <ul>{searchInput.length > 0 ? filtered.map((tweet) => {
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

export default Search;