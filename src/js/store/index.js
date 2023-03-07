import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import chatReducer from "../reducers/chats";
import authReducer from "../reducers/auth";
import appReducer from "../reducers/app";
import settingsReducer from "../reducers/settings";

import appMiddleware from "./middlewares/app";

export default () => {
  const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === "AUTH_LOGOUT_SUCCESS") {
      Object.keys(state).forEach((key) => {
        if (state[key].savable) return;
        state[key] = undefined;
      });
    }
    return mainReducer(state, action);
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(reduxThunk)
        .concat(appMiddleware),
  });

  return store;
};
