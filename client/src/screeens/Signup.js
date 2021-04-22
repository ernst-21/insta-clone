import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState(undefined);
  const history = useHistory();

  const uploadPic = () => {

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'insta-clone');
    data.append('cloud_name', 'ernst1');
    fetch('https://api.cloudinary.com/v1_1/ernst1/image/upload', {
      method: 'POST',
      body: data
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const uploadFields = useCallback(
    () => {

      if (!/\S+@\S+\.\S+/.test(email)) {
        M.toast({ html: 'Invalid Email', classes: '#c62828 red darken-3' });
        return;
      }
      fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          pic: url
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
    },
    [email, history, name, password, url]
  );

  const postData = (e) => {
    e.preventDefault();
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url, uploadFields]);

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
        <div className="file-field input-field">
          <div className="btn #42a5f5 blue lighten-1">
            <span>Upload Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
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
