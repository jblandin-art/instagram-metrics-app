import path from 'path';
import {app, BrowserWindow, ipcMain} from 'electron';
import {fileURLToPath} from 'url';
const isDev = !app.isPackaged;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let win;
function createWindow () {
    win = new BrowserWindow({
        width: 1400,
        height: 700,
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
    //win.loadFile("renderer/renderer-app/dist/index.html");
    //win.loadFile("renderer/index-pre-react.html");
    win.loadURL('http://localhost:5173');
}
else {
    //Load the production file (index.html)
    console.log("evaluated false for isDev");
    win.loadFile(path.join(__dirname, 'renderer', 'renderer-app',  'index.html'));
}
}

app.whenReady().then(() => {
createWindow()
})


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
