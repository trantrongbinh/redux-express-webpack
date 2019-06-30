/**
 * Created by trantrongbinh on 30/06/2019.
 */

const express = require('express');
const path = require('path');
const ejs = require('ejs');

// Create server
const app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;
server.listen(port);

// Return index.html for '/'
app.get('/', function (req, res) {
    res.render('index');
});

// Set path for views and static resources
app.set('views', './client/public');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use('/static', express.static('./client/build'));
