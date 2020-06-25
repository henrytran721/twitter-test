# Twitter

## Sign Up 
1. Sign up consists of using axios to post request our user object / input from react client to express backend
2. Installed password-validator and created a schema which will validate our password in terms of having at least an uppercase letter, lowercase letter, and number and passes it to a boolean. If our boolean variable returns true, execute password hashing with bcryptjs and create new object that will be pushed to our database. If our password returns false, send a response in the form of json to indicate that our password has failed and display this error onto the front end. 
3. Check our database with mongoose function `findOne()` in order to find if the same username has been taken and return an json response error to the front end that will be displayed

## Login
1. created an axios js client that handles the baseUrl so when project is pushed to production, I can easily change the baseUrl for all endpoints
2. configured login with a POST method that calls passport.authenticate and calls my LocalStrategy method, serializeUser, and deserializeUser to authenticate the username and password against entries in the database
3. To allow users to continually be logged in, I used the window local storage object to store my user data when retrieved via post method from log in. I then set the state of logged in to true and conditionally render the home page. 
4. Initially, I was setting the state of my userInfo / user data I was manipulating to the user data I retrieved at the beginning of when the user logs in. This method became flawed because I was not retrieve the updated version of user data from my database every time the page refreshes based on user interaction. To mend this issue, I ran a post method with axios and sending only the logged in user id from local storage to run a query against my database using `User.findById()` and retrieving a new copy of my user every time the user refreshes the page and setting this to the new user state.

 ## Ability to create new Tweets / Upload images to tweet
1. I created a text area input field which I monitored it's changing values with `onChange` method and setting the state of the corresponding variables to store these values on the client side until the hits the Tweet button to run a post method 
2. The upload image was one of the parts of this project I wanted to learn and add to my skillset. I initially added an input field with the type attribute set to 'file'. This allowed me to give the user the option to upload an file. Initially, the file input rendered a button showing 'Choose File' and 'No File Chosen'. I believed that this did not meet my requirements for my design so I set this input field to `display: none` and created another button that fit my needs and set this button to onClick the latter button and run it's necessary functions. 
3. I retrieved the object that the file upload created with an event handler `e.target.files[0]` and set that to a state variable. I set another state variable called `imageUrl` to `URL.createObjectURL(file)` which created an image to display on the client to show my users the image they are trying to upload. 
4. On the post method itself, I configured a formData object that appended my file object, tweet text / info, and user info and sent that to my backend. I ran a query to search for the logged in user and created a new tweet object from my Tweet mongoose schema and saved it to my database. I configured how the uploading of images will work which it creates a folder on my backend server and adds the images in that folder with the extension of image-date-pathname. 
5. Initially I went with a methodology that allowed me to store the image uploads in a folder called `uploads` on my server. This was not a viable solution because when I deployed to heroku, the images would not stay rendered for a long period of time because Heroku is a read-only file system. I found an alternative by setting up Amazon S3 bucket to upload my images to and creating a new `Tweet` object or mongoDB instance with the S3 bucket link. The link would eventually look like this after rendering: `https://henri-twitter-1.s3.amazonaws.com/jordan.jpeg`.
6. I retrieve all of my tweets on the front end by querying my post data array on my database with an axios post method in componentDidMount() so it renders every time the page refreshes. With the data I received as a response, I set a state variable to this array and mapped over the array to render each component dynamically and filling in the corresponding information where needed.