const {app, BrowserWindow} = require('electron');

function createWindow () {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        frame: false,
        transparent: true,
    })
    window.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow)
