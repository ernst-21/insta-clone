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
        console.log(result);
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
            src="https://images.unsplash.com/photo-1542246338-3d81305c2cd5?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '108%'
            }}
          >
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
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
