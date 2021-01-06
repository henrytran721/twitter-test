import React from 'react';
import './App.css';
import Home from './views/Home.js';
import Bookmark from './views/Bookmark.js';
import Profile from './views/Profile.js';
import Tweet from './views/Tweet.js';
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
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
      </Router>
      </div>
    )
  }
}

export default App;