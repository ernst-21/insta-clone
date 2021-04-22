import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const existingUser = JSON.parse(localStorage.getItem('user'));

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isFollowed, setIsFollowed] = useState(null);
  const [user, setUser] = useState(existingUser);
  const { dispatch } = useContext(UserContext);
  const { userid } = useParams();

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
        if (user) {
          setIsFollowed(result.user.followers.includes(user._id));
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
          payload: { following: data.following, followers: data.followers }
        });

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
          payload: { following: data.following, followers: data.followers }
        });
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
              <h4>{userProfile.user.name}</h4>
              <h4>{userProfile.user.email}</h4>
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
                  style={{ margin: '.75rem' }}
                  className="btn waves-effect waves-light #42a5f5 blue lighten-1"
                  onClick={() => unfollowUser()}
                >
                  {' '}
                  unFollow
                </button>
              ) : (
                <button
                  type="button"
                  style={{ margin: '.75rem' }}
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
