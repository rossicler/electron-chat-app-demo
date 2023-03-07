import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./views/Home";
import Welcome from "./views/Welcome";
import Settings from "./views/Settings";
import Chat from "./views/Chat";
import LoadingView from "./components/shared/LoadingView";

import StoreProvider from "./store/StoreProvider";
import { listenToAuthChanges } from "./actions/auth";
import { listenToConnectionChanges } from "./actions/app";
import ChatCreate from "./views/ChatCreate";
import { checkUserConnection } from "./actions/connection";

const AuthRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  const onlyChild = React.Children.only(children);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.cloneElement(onlyChild, { ...rest, ...props })
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector((state) => state.auth.isChecking);
  const isOnline = useSelector((state) => state.app.isOnline);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());

    return () => {
      unsubFromAuth();
      unsubFromConnection();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubFromUserConnection;
    if (user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
    }

    return () => {
      if (unsubFromUserConnection) unsubFromUserConnection();
    };
  }, [dispatch, user]);

  if (!isOnline) {
    return (
      <LoadingView message="Application has been disconnected from the internet. Please reconnect..." />
    );
  }

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <Router>
      <div className="content-wrapper">
        <Switch>
          <Route path="/" exact>
            <Welcome />
          </Route>
          <AuthRoute path="/settings">
            <Settings />
          </AuthRoute>
          <AuthRoute path="/chat/:id">
            <Chat />
          </AuthRoute>
          <AuthRoute path="/home">
            <Home />
          </AuthRoute>
          <AuthRoute path="/chatCreate">
            <ChatCreate />
          </AuthRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  );
}
