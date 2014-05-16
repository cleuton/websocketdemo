var WebSocket = require('ws');
var uuid = require('node-uuid');

exports.index = function(req, res){
  var identificador = uuid.v1();
  res.render('index', { title: 'Msg app', 
                        'msg': mensagem.texto ,
                        'uuid' : identificador});
};

exports.novamsg = function(req, res){
  mensagem.texto = req.params.mensagem;
console.log('Conexoes: ' + conexoes.length);  
  for (var x=0;x<conexoes.length;x++) {
     console.log('Enviando msg para uuid: ' + conexoes[x].uuid);
     conexoes[x].send(mensagem.texto);
  }
  res.header("Content-Type", "application/json; charset=utf-8");
  res.json({ 'msg' : mensagem.texto });
};


