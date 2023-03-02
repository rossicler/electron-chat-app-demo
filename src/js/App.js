import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Welcome from "./views/Welcome";
import Settings from "./views/Settings";
import Chat from "./views/Chat";
import Navbar from "./components/Navbar";

import configureStore from "./store";
import { listenToAuthChanges } from "./actions/auth";

const store = configureStore();

export default function App() {
  useEffect(() => {
    store.dispatch(listenToAuthChanges());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Switch>
            <Route path="/" exact>
              <Welcome />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/chat/:id">
              <Chat />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
