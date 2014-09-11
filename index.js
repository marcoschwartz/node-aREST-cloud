var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();

var logfmt = require("logfmt");
app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send('index.html');
});

var server = http.createServer(app);
server.listen(80);

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {

  app.get('/api', function(req, res){
    command = req.query['command'];
    ws.send(command + ' /');
    res.send("OK");	
  });

  setInterval(function(){ ws.send('Ping'); }, 5000);

  ws.on('message', function(message) {
    console.log('received: %s', message);
    // ws.send(message);
  });
});