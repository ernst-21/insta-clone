import { Route, Switch, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import Home from '../screeens/Home';
import Signin from '../screeens/Signin';
import Signup from '../screeens/Signup';
import Profile from '../screeens/Profile';
import CreatePost from '../screeens/CreatePost';

const Routing = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      history.push('/');
    } else {
      history.push('/signin');
    }
  }, [history]);

  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </Switch>
  );
};

export default Routing;

// testing the comments
