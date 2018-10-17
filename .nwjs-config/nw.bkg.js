const isProduction = process.env.NODE_ENV === 'production'
const config = require('./config');

const url = isProduction ? './dist/app/index.html' : `http://${config.dev.host}:${config.dev.port}`;
const winConfig = nw.App.manifest.window;

winConfig.new_instance = true;

nw.Window.open(url, winConfig);