import {
  configureStore,
  applyMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import chatReducer from "../reducers/chats";
import authReducer from "../reducers/auth";

export default () => {
  const middlewares = [reduxThunk];

  const store = configureStore(
    {
      reducer: combineReducers({ chats: chatReducer, auth: authReducer }),
    },
    applyMiddleware(...middlewares)
  );

  return store;
};
