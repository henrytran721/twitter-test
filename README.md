# Twitter

Viewable at: https://henri-twitter-test.herokuapp.com

Tools used: React.js, node-sass, axios, Express, MongoDB, Mongoose Schemas, localStorage, express-session, Passport.js, bcryptjs, async library, dotenv, password-validator, multer, AWS S3 Bucket, Heroku 

Goal: Recreate Twitter with React.js client and Express backend to learn about cross origin data transfer to a MongoDB database, CRUD operations with RestAPI endpoints, and conditional rendering based on passed data from POST / GET requests. To learn about how to deploy a full stack application to heroku to connect client and server endpoints together. 

## Sign Up 
1. Sign up consists of using axios to post request our user object / input from react client to express backend
2. Installed password-validator and created a schema which will validate our password in terms of having at least an uppercase letter, lowercase letter, and number and passes it to a boolean. If our boolean variable returns true, execute password hashing with bcryptjs and create new object that will be pushed to our database. If our password returns false, send a response in the form of json to indicate that our password has failed and display this error onto the front end. 
3. Check our database with mongoose function `findOne()` in order to find if the same username has been taken and return an json response error to the front end that will be displayed

## Login
1. created an axios js client that handles the baseUrl so when project is pushed to production, I can easily change the baseUrl for all endpoints
2. configured login with a POST method that calls passport.authenticate and calls my LocalStrategy method, serializeUser, and deserializeUser to authenticate the username and password against entries in the database
3. To allow users to continually be logged in, I used the window local storage object to store my user data when retrieved via post method from log in. I then set the state of logged in to true and conditionally render the home page. 
4. Initially, I was setting the state of my userInfo / user data I was manipulating to the user data I retrieved at the beginning of when the user logs in. This method became flawed because I was not retrieve the updated version of user data from my database every time the page refreshes based on user interaction. To mend this issue, I ran a post method with axios and sending only the logged in user id from local storage to run a query against my database using `User.findById()` and retrieving a new copy of my user every time the user refreshes the page and setting this to the new user state.

 ## Ability to create new Tweets
1. I created a text area input field which I monitored it's changing values with `onChange` method and setting the state of the corresponding variables to store these values on the client side until the hits the Tweet button to run a post method 
2. I retrieve all of my tweets on the front end by querying my post data array on my database with an axios post method in componentDidMount() so it renders every time the page refreshes. With the data I received as a response, I set a state variable to this array and mapped over the array to render each component dynamically and filling in the corresponding information where needed.

## Ability to Retweet, remove Retweet, Like, remove Like, Bookmark, and unbookmark
1. Managing the ability to retweet and unretweet was similar to all the other interactions above. I rendered each tweet to the client side by mapping over my retrieved tweets data and serving it with the user, username, time since posted, image, retweet button, like button, and bookmark button. 
2. When a user hits the retweet button, a post method is executed which passes in the post id and user id. I first stored the user's current retweets and a variable and searched for the post with `Tweet.findById(postid)` which I would get a response if successful. With the response, I pushed it into the stored retweets array and ran another query with `User.findByIdAndUpdate(userid)` while passing in my user instance, using the same id, and passing in the new updated retweets array. I also pushed it to the overall tweets array so it will be displayed on the client side. 
3. On the client side, I wrote a conditional statement that checks if the post has a `userRetweeted` key. If it exists, it will loop through it and find the desired data and fill it in. (e.g. `@KingJames retweeted`) The button itself is also conditionally rendered to match if the retweet user is equal to the logged in user and if this is true, it will render another button that says `Retweeted`.
4. To unretweet, I would run the same operations but remove the individual tweet off of the corresponding array with `findByIdAndDelete()` while running a `filter` method against the current retweets array that returns objects that do not match the selected tweet.
5. For the like functionality, it was a very similar method where I passed in the post id and user id and found the necessary info, pushed the found tweet to the current array, and updated the user object with a `likedTweets` array. On the client side, I conditionally rendered by matching if the liked tweet is the same as the current rendered tweet with `(indexOf(post._id) > -1)` and rendering a red heart if true. 
6. The bookmarks functionality follows the same pattern as the as the like functionality, however I dedicated a whole page so users can click on their bookmarks and view what they have currently saved.

## Rendering Bookmark and Profile pages
1. For the Bookmarks page, I sent a post request to my server to retrieve all the tweets available and my logged in user (using the user id from localStorage). After retrieving the data and setting them to a stateful variable, I passed my user into my functional component as props and mapped through the bookmark array I created from my previous function that stores bookmarks in my user's object. After mapping over the array, I displayed the necessary information with the corresponding buttons with functions. 
2. For the profile page, I wanted my users to be able to add their own information such as location, birthdate, and hyperlink. If the user is logged in and on their own profile, they will be prompted with a form that allows them to enter the latter information and save it to the database. If the user is on someone else's profile, they will not be able to see this form and will be able to see the profile information if available. Therefore, I had to pass in both the profile user's object(from url parameter using `this.props.match.params.id`) as well as the logged in user's object (from localStorage). I created two loops that would loop over the profile user's retweets and tweets and added the entries to a brand new array. With the new array filled, I mapped over this array and rendered the necessary information which includes retweeted user, username, tweet, image, and functional interaction buttons. 

## Search Bar
1. The search bar was the second big component that I wanted to learn how to build, aside from configuring image uploads. 
2. I created a input field that receives text and tracked the input with an onChange method setting the input to a stateful string. 
3. In my render method of my parent class, I looped through all of the tweets and users and added each entry with either the tweet or first name / last name / user name transformed to lowercase using `toLowerCase()` method to an array called `lowercaseTweets`.
4. I created another array called `filteredTweets` that takes my `lowercaseTweets` array and filters based on the condtion of either the search input contains the same string as one of my tweets or usernames.  
5. I passed in my `filteredTweets` array that re-renders after every search input character into my searchbar component and displayed the results under my search bar. If a user clicks on a result, they will be sent to either an individual tweet page or the corresponding user profile.
