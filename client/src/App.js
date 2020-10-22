import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import GameDetail from "./views/GameDetail";
import CreateGame from "./views/CreateGame";
import Profile from "./views/Profile";
import { useDispatch } from "react-redux";
import { getProfile } from "./store/actions/userAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
    // eslint-disable-next-line
  }, [localStorage]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/create/game">
            <CreateGame />
          </Route>
          <Route path="/games/:id">
            <GameDetail />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
