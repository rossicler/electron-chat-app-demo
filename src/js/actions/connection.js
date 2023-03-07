import * as api from "../api/connection";

export const checkUserConnection = (uid) => (dispatch) =>
  api.onConnectionChanged((isConnected) => {
    api.setuserOnlineStatus(uid, isConnected);
    dispatch({ type: "CONNECTION_USER_STATUS_CHANGED" });
  });
