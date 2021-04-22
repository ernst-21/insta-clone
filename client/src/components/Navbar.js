import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    history.push('/signin');
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? '/' : '/signin'} className="brand-logo left" style={{ color: 'black' }}>
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {!state && (
            <>
              <li>
                <Link to="/signin" style={{ color: 'black' }}>
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/signup" style={{ color: 'black' }}>
                  Sign up
                </Link>
              </li>
            </>
          )}
          {state && (
            <>
              <li>
                <Link to="/profile" style={{ color: 'black' }}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/create" style={{ color: 'black' }}>
                  Create Post
                </Link>
              </li>
              <li>
                <Link to="/myfollowingpost" style={{ color: 'black' }}>
                  Following Posts
                </Link>
              </li>
              <button
                type="button"
                className="btn waves-effect waves-light #e57373 red lighten-2"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
