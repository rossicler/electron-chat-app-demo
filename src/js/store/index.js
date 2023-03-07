import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import chatReducer from "../reducers/chats";
import authReducer from "../reducers/auth";
import appReducer from "../reducers/app";

import appMiddleware from "./middlewares/app";

export default () => {
  const store = configureStore({
    reducer: combineReducers({
      chats: chatReducer,
      auth: authReducer,
      app: appReducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(reduxThunk)
        .concat(appMiddleware),
  });

  return store;
};
