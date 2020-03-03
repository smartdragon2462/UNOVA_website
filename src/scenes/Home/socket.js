
import openSocket from 'socket.io-client';
const socketAPI = process.env.REACT_APP_API_ENDPOINT || null;
const socket = openSocket(socketAPI);

function subscribeToNewBlock(callback) {
  socket.on('explorer:block:create', block => callback(null, block));
}

function subscribeToNewTransaction(callback) {
  socket.on('explorer:tx:create', tx => callback(null, tx));
}

function subscribeToInfoUpdate(callback) {
  socket.on('explorer:info:update', info => callback(null, info));
}

function subscribeToApolloUpdate(address, callback) {
  socket.on(`explorer:apollo:${address}:update`, apollo => callback(null, apollo));
}

function subscribeToAtlasUpdate(address, callback) {
  socket.on(`explorer:atlas:${address}:update`, atlas => callback(null, atlas));
}

function subscribeToAccountUpdate(address, callback){
  socket.on(`explorer:account:${address}:update`, account => callback(null, account));
}

function subscribeToNewBundle(callback) {
  socket.on('explorer:bundle:create', bundle => {
    callback(null, bundle);
  });
}

export {
  subscribeToNewBlock,
  subscribeToNewTransaction,
  subscribeToInfoUpdate,
  subscribeToAtlasUpdate,
  subscribeToNewBundle,
  subscribeToApolloUpdate,
  subscribeToAccountUpdate,
};
