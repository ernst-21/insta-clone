import React from 'react';

const Home = () => {
  return (
    <div className='home'>
      <div className='card home-card'>
        <h5>ramesh</h5>
        <div className="card-image">
          <img src="https://images.unsplash.com/photo-1585848705732-e938bf971da6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2FscGFwZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="image"/>
        </div>
        <div className="card-content">
          <i className="material-icons">favorite</i>
          <h6>title</h6>
          <p>This is an amazing post</p>
          <input type="text" placeholder='add a comment'/>
        </div>
      </div>
    </div>
  );
};

export default Home;
