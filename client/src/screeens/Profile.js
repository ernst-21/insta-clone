import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/userContext';

const Profile = () => {
  const [myPics, setMyPics] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch('/myposts', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then((res) => res.json())
      .then((result) => {
        setMyPics(result.mypost);
      });
  }, []);

  return (
    <div style={{ maxWidth: '550px', margin: '0px auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '18px 0px',
          borderBottom: '1px solid gray'
        }}
      >
        <div>
          <img
            src={state ? state.pic : 'loading'}
            alt="man"
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '80px'
            }}
          />
        </div>
        <div>
          <h4>{state ? state.name : 'Loading...'}</h4>
          <h4>{state ? state.email : 'Loading...'}</h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '108%'
            }}
          >
            <h6>{myPics.length} posts</h6>
            <h6>{state ? state.followers.length : '...'} followers</h6>
            <h6>{state ? state.following.length : '...'} following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {myPics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
