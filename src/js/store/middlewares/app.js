import Notification from "../../utils/notifications";

export default (store) => (next) => (action) => {
  console.log("it's here");
  switch (action.type) {
    case "APP_IS_ONLINE":
    case "APP_IS_OFFLINE": {
      Notification.show({
        title: "Displaying notification!",
        body: action.isOnline ? "Online" : "Offline",
      });
    }
  }
  next(action);
};