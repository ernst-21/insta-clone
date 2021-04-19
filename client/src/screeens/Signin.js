import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import M from 'materialize-css';

const Signin = () => {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const postData = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'USER', payload: data.user });
          M.toast({
            html: 'Sign in successful',
            classes: '#00e676 green accent-3'
          });
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="mycard" onSubmit={postData}>
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn waves-effect waves-light #42a5f5 blue lighten-1"
        >
          Sign In
        </button>
        <h6>
          <Link to="/signup">You don&apos;t have an account? Sign Up</Link>
        </h6>
      </div>
    </form>
  );
};

export default Signin;
