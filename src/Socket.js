import io from "socket.io-client";

class Socket {
  #socket;
  #debug;
  constructor(){
    this.#socket = null;
    this.#debug = false;
    this.events = {};
  }

  #log(message){
    if(this.#debug !== true ){
      return;
    }
    console.log(`[ WEBSOCKET ]: ${message}`);
  }

  #throwError(message){
    this.#log(`ERROR / ${message}`)
    throw Error(message);
  }

  #addEvent(name, cb){
    if(!name || name === ''){
      this.#throwError('Event name can\'t be empty!');
    }
    if(!cb || typeof cb !== "function" ) {
      this.#throwError(`${name} events callback is not a function!`);
    }

    this.events[name] = cb;
    this.#socket.on(name, cb);
  }

  getSocket(){
    return this.#socket;
  }

  connect(url, options){
    if(this.#socket !== null){
      return;
    }

    this.#socket = io(url, options);
    this.#debug = process.env.REACT_APP_DEBUG_WEBSOCKET
      ? (process.env.REACT_APP_DEBUG_WEBSOCKET === 'true' ? true: false )
      : ( process.env.NODE_ENV === 'development' || false );
    this.#log(`socket connect to "${url}" with "${JSON.stringify(options)}" options`);
    return true;
  }

  emit(name, value){
    if(this.#socket === null){
      this.#throwError('pls connect to websocket!');
    }
    this.#socket.emit(name, value);
    this.#log(`"${name}" emited with "${JSON.stringify(value)}"`);
  }

  on(name, callback){
    if(this.events[name]){
      this.#log(`Re-assigning callback for "${name}" event is blocked.`);
      return;
    }
    if(this.#socket === null){
      this.#throwError('pls connect to websocket!');
    }
    this.#addEvent(name, callback);
    this.#log(`socket.on( "${name}" ) called!`)
  }

  close(){
    if(this.#socket === null){
      return;
    }
    this.#socket.close();
  }
}

export default new Socket();
