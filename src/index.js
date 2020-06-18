const {createWindow} = require('./main')
const {app} = require('electron')

require('./database')

require('electron-reload')(__dirname)//reinia cuando hay un camio en la carpeta

app.allowRendererProcessReuse=false;
app.whenReady().then(createWindow);//cuando la palicacion esta carda se ejecuta createwindow