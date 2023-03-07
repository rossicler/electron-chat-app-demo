import AppStorage from "../utils/storage";

const INIT_STATE = {
  isDarkTheme: false,
  playSound: true,
  showNotifications: true,
  savable: true,
};

export default function settingsReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "SETTINGS_UPDATE":
      return { ...state, [action.setting]: action.value };
    case "SETTINGS_INITIAL_LOAD": {
      const settings = AppStorage.getItem("app-settings");
      return { ...state, ...settings };
    }
    default:
      return state;
  }
}
