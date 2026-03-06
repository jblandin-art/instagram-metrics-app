import path from 'path';
import {app, BrowserWindow, ipcMain, dialog } from 'electron';
import {fileURLToPath} from 'url';
import fs from 'fs';
import { autoUpdater } from "electron-updater";

const isDev = process.env.FORCE_DEV === "true" 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let win;
function createWindow () {
    win = new BrowserWindow({
        width: 1400,
        height: 700,
        icon: path.join(__dirname, 'assets', 'app-icon.ico'),
        autoHideMenuBar: true,
        frame: false,
        transparent: true,
        backgroundColor: '#00000000', // fully transparent
        webPreferences: {
        preload: path.join(__dirname, 'preload.js')    
        }
    })


if (isDev) {
    //load Vite dev server
    console.log("evaluated true for isDev");
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
}
else {
    //Load the production file (index.html)
    console.log("evaluated false for isDev");
    win.loadFile(path.join(__dirname, 'renderer', 'renderer-app',  'dist', 'index.html'));
}
}

app.whenReady().then(() => {
createWindow()
})

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});

ipcMain.on("minimize-window", () => {
    win.minimize();
})

ipcMain.on("is-maximized", () => {
    return win.isMaximized();
})

ipcMain.on("maximize-window", () => {
    if(win.isMaximized()) {
        win.unmaximize();
    }
    else {
        win.maximize();
    }
})

ipcMain.on("close-window", () => {
    app.quit();
})

ipcMain.on("set-ignore-mouse", (event, ignore) => {
  win.setIgnoreMouseEvents(ignore, { forward: true });
});

ipcMain.handle("save-csv", async (event, csvData) => {

    const result = await dialog.showSaveDialog({
        title: "Save CSV",
        defaultPath: "instagram_metrics.csv",
        filters: [
            { name: "CSV Files", extensions: ["csv"] }
        ]
    });

    if (result.canceled) {
        return { success: false };
    }

    fs.writeFileSync(result.filePath, csvData);

    return { success: true };
});