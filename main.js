// Main process
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

function createWindow() {
  // Browser window <- Renderer process
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      // is a feature that ensures that both, your preload scripts and Electron
      // internal logic run in separate contexts
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  if (isDev) win.webContents.openDevTools();
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

app.whenReady().then(createWindow);

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Chromium -> web engine for rendering UI, full chrome-like web browser
// V8 -> engine that provides capabilitites to execute, run, JS code in the browser
// NodeJS(V8) -> Able to execute JS code + additional features

// Webpack -> is a module builder, main purpose is to bundle JS files for usage in the browser
// Babel -> is a JS compiler
