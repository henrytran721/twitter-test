import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './views/Homepage.js';
import Login from './views/Login.js';
import Signup from './views/Signup.js';
import Bookmark from './views/Bookmark.js';
import Profile from './views/Profile.js';
import Tweet from './views/Tweet.js';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      loggedIn: false
    }
  }

  componentDidMount() {
    if(localStorage.getItem('list') !== null) {
      let user = JSON.parse(localStorage.list);
      this.setState({loggedIn: true})
    }
  }
  
  render() {
    return (
      <div>
        <Router>
                <Switch>
                    <Route path='/bookmarks'>
                        <Bookmark loggedIn={this.state.loggedIn}/>
                    </Route>
                    <Route path='/user/:id' component={Profile} />
                    <Route path='/tweet/:id' component={Tweet} />
                    <Route path='/signup'>
                        <Signup />
                    </Route>
                    <Route path='/'>
                        <Login />
                    </Route>
                </Switch>
      </Router>
      </div>
    )
  }
}

export default App;