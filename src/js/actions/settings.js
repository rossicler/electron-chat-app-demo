export const updateSettings = (setting, value) => ({
  type: "SETTINGS_UPDATE",
  setting,
  value,
});

export const loadInitialSettings = () => ({
  type: "SETTINGS_INITIAL_LOAD",
});
