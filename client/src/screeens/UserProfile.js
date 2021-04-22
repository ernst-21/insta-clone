import React, {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {UserContext} from '../context/userContext';



const UserProfile = () => {
  const existingUser = JSON.parse(localStorage.getItem('user'));
  const {dispatch} = useContext(UserContext);
  const {userid} = useParams();
  const [user, setUser] = useState(existingUser);
  const [userProfile, setUserProfile] = useState(null);
  const [isFollowed, setIsFollowed] = useState(null);



  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {Authorization: 'Bearer ' + localStorage.getItem('jwt')}
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
        if (user && user.following.includes(userid)) {
          setIsFollowed(true);
        } else {
          setUser(null);
          setIsFollowed(false);
        }
      });
  }, [userid, user]);

  const followUser = () => {
    fetch('/follow', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        followId: userid
      })
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: {following: data.following, followers: data.followers}
        });
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id]
            }
          };
        });

        setIsFollowed(data.following.find((item) => item === userid));
      });
  };

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        unfollowId: userid
      })
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: {following: data.following, followers: data.followers}
        });
        localStorage.setItem('user', JSON.stringify(data));
        setUser(null);
        setUserProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower
            }
          };
        });
        setIsFollowed(false);
      });
  };

  return (
    <>
      {userProfile ? (
        <div style={{maxWidth: '550px', margin: '0px auto'}}>
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
                src={userProfile ? userProfile.user.pic : 'loading'}
                alt="man"
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '80px'
                }}
              />
            </div>
            <div>
              <h4>{userProfile ? userProfile.user.name : 'Loading...'}</h4>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '108%'
                }}
              >
                <h6>
                  {userProfile.posts.length}{' '}
                  {userProfile.posts.length === 1 ? 'post' : 'posts'}
                </h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </div>
              {isFollowed ? (
                <button
                  type="button"
                  style={{margin: '.75rem'}}
                  className="btn waves-effect waves-light #42a5f5 blue lighten-1"
                  onClick={() => unfollowUser()}
                >
                  {' '}
                  unFollow
                </button>
              ) : (
                <button
                  type="button"
                  style={{margin: '.75rem'}}
                  className="btn waves-effect waves-light #42a5f5 blue lighten-1"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map((item) => {
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
      ) : (
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserProfile;
