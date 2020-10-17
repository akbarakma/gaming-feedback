import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
