import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (url) {
      fetch('/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          title,
          body,
          pic: url
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: '#c62828 red darken-3' });
          } else {
            M.toast({
              html: 'Post created succesfully',
              classes: '#00e676 green accent-3'
            });
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url, body, history, title]);

  const postDetails = (e) => {
    e.preventDefault();
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

  return (
    <form
      className="card input-field"
      style={{
        margin: '2rem auto',
        maxWidth: ' 500px',
        padding: ' 0.8em',
        textAlign: 'center'
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
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
        onClick={postDetails}
      >
        Submit Post
      </button>
    </form>
  );
};

export default CreatePost;
