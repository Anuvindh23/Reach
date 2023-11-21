const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(socket.id, ' connected');

  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message:', msg);
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
