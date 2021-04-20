import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    fetch('/allposts', {
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

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5 style={{ marginLeft: '1rem' }}>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt="image" />
            </div>
            <div className="card-content">
              <i className="material-icons">favorite</i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
