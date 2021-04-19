import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/Navbar';
import Routing from './components/Routing';
import { UserContext } from './context/userContext';
import { initialState, reducer } from './reducers/userReducers';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
