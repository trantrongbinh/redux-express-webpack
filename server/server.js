/**
 * Created by trantrongbinh on 30/06/2019.
 */

const express = require('express');
const path = require('path');
const ejs = require('ejs');

// const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
// const compiler = webpack({ '.. webpack options ..' });

// Create server
const app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server Running on port ${port}`));

// app.use(
//   middleware(compiler, {
//     // webpack-dev-middleware options
//   })
// );

// Return index.html for '/'
app.get('/', function (req, res) {
    res.render('index');
});

// Set path for views and static resources
app.set('views', path.join(__dirname, '..', '/client/public/dist'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use('/', express.static(path.join(__dirname, '..', '/client/public/dist')));
