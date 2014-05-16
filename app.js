
/**
 * Module dependencies.
 */

var WebSocketServer = require('ws').Server;
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

global.mensagem = {texto: '-- sem mensagem --'};
global.conexoes = [];
global.wsserver;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.put('/msg/:mensagem', routes.novamsg);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Websocket

wsserver = new WebSocketServer({port: 9090});
wsserver.on('connection', function(ws) {
    conexoes.push(ws);
    ws.on('message', function(message) {
        ws.uuid = message;
        console.log('WS identificado: ' + ws.uuid);
    });
});

