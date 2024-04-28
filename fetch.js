function worker_function() {
  //log('worker');
  self.addEventListener('message', (ev) => {
    //log(ev);
    //self.postMessage('Started');
    //self.close();
    let webSocket = null;

    function log(t) {
      console.log(t);
    }

    try {
      webSocket = new WebSocket(ev.data);
      webSocket.onopen = () => {
        log(`[open] Connection established : ${ev.data}`);
      };

      var receivedCode = 1;
      var errorCode = 0;

      webSocket.onmessage = message => {
        Handler(JSON.parse(message.data));
        //webSocket.send(receivedCode);
      };

      function Handler(message) {
        self.postMessage(message);
      }

      webSocket.onclose = function (event) {
        if (event.wasClean) {
          log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
          log(`[close] Connection died.`);
        }
      };

      webSocket.onerror = function (error) {
        log(`[error] ${error.message}`);
      };
    } catch (e) {
      log(e);
    }
  });
}

if (window != self) {
  worker_function();
}
