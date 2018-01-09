export default (socket, io) => ({
  emit: (eventName, payload) => {
    socket.emit('action', {
      type: eventName,
      payload: payload,
    });
    console.log(
      'Emit to: ' + socket.id + ' type: ' + eventName + ' payload: ' + payload,
    );
  },
  emitToStation: (stationId, eventName, payload) => {
    io.to(stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
    console.log(
      'Emit to station: ' +
        stationId +
        ', type: ' +
        eventName +
        ', payload: ' +
        payload,
    );
  },
  broadcastToStation: (stationId, eventName, payload) => {
    // Use broadcast to emit room except sender
    socket.broadcast.to(stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
    console.log(
      'Broadcast to station: ' +
        stationId +
        ', type: ' +
        eventName +
        ', payload: ' +
        payload,
    );
  },
  emitAll: (eventName, payload) => {
    io.emit('action', {
      type: eventName,
      payload: payload,
    });
    console.log('Emit to all, type: ' + eventName + ' payload: ' + payload);
  },
});