import { combineReducers } from "@reduxjs/toolkit";
import { createErrorReducer, createIsFetchingReducer } from "./common";

const createLoginReducer = () =>
  combineReducers({
    isChecking: createIsFetchingReducer("AUTH_LOGIN"),
    error: createErrorReducer("AUTH_LOGIN"),
  });

const createRegisterReducer = () =>
  combineReducers({
    isChecking: createIsFetchingReducer("AUTH_REGISTER"),
    error: createErrorReducer("AUTH_REGISTER"),
  });

const createAuthReducer = () => {
  const user = (state = null, action) => {
    switch (action.type) {
      case "AUTH_ON_ERROR":
      case "AUTH_ON_INIT":
        return null;
      case "AUTH_ON_SUCCESS":
        return action.user;
      default: {
        return state;
      }
    }
  };

  const isChecking = (state = false, action) => {
    switch (action.type) {
      case "AUTH_ON_INIT":
      case "AUTH_REGISTER_INIT":
      case "AUTH_LOGIN_INIT":
        return true;
      case "AUTH_REGISTER_ERROR":
      case "AUTH_LOGIN_ERROR":
      case "AUTH_ON_SUCCESS":
      case "AUTH_ON_ERROR":
        return false;
      default: {
        return state;
      }
    }
  };

  return combineReducers({
    user,
    isChecking: createIsFetchingReducer("AUTH_ON"),
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
};

export default createAuthReducer();