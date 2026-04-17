import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL('http://localhost:4200/');
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
});
