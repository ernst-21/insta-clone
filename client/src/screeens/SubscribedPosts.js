import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../context/userContext';
import {Link} from 'react-router-dom';

const SubscribedPosts = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const { state } = useContext(UserContext);
  const isMounted = useRef(false);

  useEffect(() => {
    fetch('/getsubpost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
    return () => {
      isMounted.current = false;
    };
  }, []);

  const likePost = (id) => {
    fetch('/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        text,
        postId
      })
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        setValue('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unComment = (postId, id, text) => {
    fetch('/uncomment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId,
        id,
        text
      })
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5 style={{ marginLeft: '1rem' }}>
              <Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}` : '/profile'}>{item.postedBy.name}</Link>
              {item.postedBy._id === state._id && (
                <i
                  style={{ float: 'right' }}
                  className="material-icons"
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} alt="image" />
            </div>
            <div className="card-content">
              <i className="material-icons">favorite</i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => unlikePost(item._id)}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => likePost(item._id)}
                >
                  thumb_up
                </i>
              )}
              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record, i) => {
                return (
                  <h6 key={i}>
                    <span style={{ fontWeight: '500' }}>
                      {record.postedBy.name}
                    </span>
                    {' ' + record.text}
                    {record.postedBy._id === state._id && (
                      <i
                        style={{ float: 'right' }}
                        className="material-icons"
                        onClick={() =>
                          unComment(item._id, record._id, record.text)
                        }
                      >
                        delete
                      </i>
                    )}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input
                  type="text"
                  value={value}
                  placeholder='add a comment'
                  onChange={e => setValue(e.target.value)}
                />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubscribedPosts;
