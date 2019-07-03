/**
 * Created by trantrongbinh on 30/06/2019.
 */
const chokidar = require('chokidar');
const express = require('express');
const path = require('path');
const ejs = require('ejs');

const webpack = require('webpack');
const config = require('../webpack.config.js');
const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(
	compiler,
	config.devServer
);
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

const app = express();

// Serve hot-reloading bundle to client
app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

// Return index.html for '/'
app.get('/', function (req, res) {
    res.render('index');
});

// Set path for views and static resources
app.set('views', path.join(__dirname, '..', '/client/public/dist'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use('/', express.static(path.join(__dirname, '..', '/client/public/dist')));

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch('../server/server');

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /server/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});

// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
compiler.plugin('done', function() {
  console.log("Clearing /client/ module cache from server");
  Object.keys(require.cache).forEach(function(id) {
    if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
  });
});

// Create server
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server Running on port ${port}`));