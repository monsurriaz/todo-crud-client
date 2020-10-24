import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import PrivateRoute from './components/Login/PrivateRoute';
import Updates from './components/Updates/Updates';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn : false,
    name: '',
    email: '',
    photo: ''
  });
  const [update, setUpdates] = useState([]);
  // const [todos, setTodos] = useState([]);
  
  return (
    <UserContext.Provider value={{logged: [loggedInUser, setLoggedInUser], updates: [update, setUpdates]}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/todo">
            <Main />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/update">
            <Updates />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
