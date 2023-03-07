import Notification from "../../utils/notifications";
import AppStorage from "../../utils/storage";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case "APP_IS_ONLINE":
    case "APP_IS_OFFLINE": {
      const { showNotifications } = store.getState().settings;
      if (showNotifications) {
        Notification.show({
          title: "Displaying notification!",
          body: action.isOnline ? "Online" : "Offline",
        });
      }
    }
    case "SETTINGS_UPDATE": {
      const { setting, value } = action;
      const currentSettings = AppStorage.getItem("app-settings");
      const settings = { ...currentSettings, [setting]: value };
      AppStorage.setItem("app-settings", settings);
    }
    case "AUTH_LOGOUT_SUCCESS": {
      const { messagesSubs } = store.getState().chats;
      if (messagesSubs) {
        Object.keys(messagesSubs).forEach((key) => messagesSubs[key]());
      }
    }
  }
  next(action);
};
