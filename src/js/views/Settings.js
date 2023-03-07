import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../actions/settings";
import { withBaseLayout } from "../layouts/Base";

const Settings = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.settings.isDarkTheme);
  const playSound = useSelector((state) => state.settings.playSound);
  const showNotifications = useSelector(
    (state) => state.settings.showNotifications
  );

  const updateSettingsHandler = ({ target: { checked, name } }) => {
    dispatch(updateSettings(name, checked));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form className="centered-container-form">
          <div className="header">Adjust application settings</div>
          <div className="form-container">
            <div className="my-3">
              <div className="form-check">
                <input
                  checked={isDarkTheme}
                  onChange={updateSettingsHandler}
                  name="isDarkTheme"
                  type="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label">Dark Theme</label>
              </div>
              <div className="form-check">
                <input
                  checked={showNotifications}
                  onChange={updateSettingsHandler}
                  name="showNotifications"
                  type="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label">Enable Notification</label>
              </div>
              <div className="form-check">
                <input
                  checked={playSound}
                  onChange={updateSettingsHandler}
                  name="playSound"
                  type="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label">Sound notification</label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => electron.appApi.quitApp()}
              className="btn btn-danger"
            >
              Quit App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBaseLayout(Settings, { canGoBack: true });
