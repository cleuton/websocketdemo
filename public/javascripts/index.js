// Página de eventos do Cliente

var porta = 8080;
var websocket;
$(document).ready(function(){
	  $("#btnsend").click(function(){
         $.ajax({
             url: "/msg/" + $("#textomsg").val(),
             type: 'PUT',
             fail:  function(jqXHR, textStatus) {
                 $("#mensagens")
                  .text("Erro ao postar mensagem: " 
                  + textStatus);
             }
         });   	  
	  });
      websocket = new WebSocket("ws://localhost:9090/");
      websocket.onopen =  function() {
                  console.log('Websocket aberto'); 
                  websocket.send(meuid);
               };
      websocket.onerror =  function(e) {
                  console.log('Websocket erro: ' + e.data); 
               };             
      websocket.onmessage = function(e) { 
                  $('#mensagens').text(e.data)
                  console.log('mensagem: ' + e.data); 
               };

  
  });
	  
