import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const postData = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      M.toast({ html: 'Invalid Email', classes: '#c62828 red darken-3' });
      return;
    }
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({ html: data.message, classes: '#00e676 green accent-3' });
          history.push('/signin');
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Sign Up
        </button>
        <h6>
          <Link to="/signin">Already have an account? Sign In</Link>
        </h6>
      </div>
    </form>
  );
};

export default Signup;
