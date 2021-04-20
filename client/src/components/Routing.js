import { Route, Switch, useHistory } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import Home from '../screeens/Home';
import Signin from '../screeens/Signin';
import Signup from '../screeens/Signup';
import Profile from '../screeens/Profile';
import CreatePost from '../screeens/CreatePost';
import { UserContext } from '../context/userContext';

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      history.push('/signin');
    }
  }, [history, dispatch]);

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
