// Main process
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  Tray,
} = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

const dockIcon = path.join(__dirname, "assets/images/react_app_logo.png");
const trayIcon = path.join(__dirname, "assets/images/react_icon.png");

function createSplashWindow() {
  // Browser window <- Renderer process
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      // is a feature that ensures that both, your preload scripts and Electron
      // internal logic run in separate contexts
      contextIsolation: true,
    },
  });

  win.loadFile("splash.html");

  return win;
}

function createWindow() {
  // Browser window <- Renderer process
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#6e707e",
    show: false,
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

  return win;
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

if (process.platform === "darwin") {
  app.dock.setIcon(dockIcon);
}

let tray = null;
app.whenReady().then((_) => {
  const template = require("./utils/Menu").createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);

  const splash = createSplashWindow();
  const mainApp = createWindow();

  mainApp.on("ready-to-show", () => {
    setTimeout(() => {
      splash.destroy();
      mainApp.show();
    }, 1000);
  });
});

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

ipcMain.on("app-quit", () => {
  app.quit();
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
