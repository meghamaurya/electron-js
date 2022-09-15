const { app, BrowserWindow, Menu, shell } = require("electron");

const isMac = process.platform == "darwin";
function createWindow() {
    const window = new BrowserWindow({
        width: 600,
        height: 800
    })
    window.loadFile("index.html")
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {                               //when app automatically closed
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (!isMac) {
        app.quit()
    }
})

const template = [
    ...(isMac ? [
        {
            label: app.name,
            submenu: [
                { role: "about" }
            ]
        },
    ] : []),
    {
        label: "File",
        submenu: [{ role: isMac ? "close" : "quit" }],
    },
    {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" }
        ]
    },
    {
        role: "help",
        submenu: [
            {
                label: "learn more",
                click: async () => {
                    // const { shell } = await require("electron");
                    await shell.openExternal("http://delta.soal.io")
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);