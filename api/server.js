/**
 * WhDocker Daemon
 */

'use strict';

var express = require('express')
var path = require('path');
var cors = require('cors');
var rApi = require('./api')

var app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.static(path.join(__dirname + '/../dist')));

/*app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});*/

app.use('/api/v1', rApi);

app.listen(3001, function () {
  console.log('WhDocker Daemon listening on port 3001!')
});
