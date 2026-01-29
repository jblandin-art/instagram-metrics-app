const {app, BrowserWindow, ipcMain} = require('electron');

let win;
function createWindow () {
    win = new BrowserWindow({
        width: 1400,
        height: 700,
        autoHideMenuBar: true,
        frame: false,
        transparent: true,
        webPreferences: {
        preload: __dirname + '/preload.js'
        }
    })
    win.loadFile('renderer/index.html');
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
