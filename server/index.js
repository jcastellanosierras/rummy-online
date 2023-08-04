import express from "express"
import { Server } from "socket.io"
import http from 'http'
import { PORT } from "./config.js"
import cors from 'cors'

// Express application
const app = express();
// HTTP server using express application
const server = http.createServer(app);
// Socket using HTTP server
// Allow cors to server http://localhost:5173 (React Client)
const io = new Server(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}`,
  }
});

app.use(cors());

let rooms = [];

io.on('connection', (socket) => {
  console.log('An user connected: ', socket.id);
  // io.disconnectSockets();
  // Event create-room
  socket.on('create-room', ({ host, code, pass }) => {
    // Put the code and pass y rooms array
    const room = {
      host,
      code,
      pass,
      users: []
    }

    rooms.push(room);

    // When the room data was saved
    // Send the confirmation to the room host
    io.to(socket.id).emit('room-created');
  });

  // Event join-room
  socket.on('join-room', ({name, code, pass}) => {
    // Check if the room-code exists
    const roomIndex = rooms.findIndex((room) => room.code === code);
    const room = rooms[roomIndex];

    // Add the user to the room
    rooms[roomIndex].users.push(name);

    if (room.host === name) {
      socket.join(room.code);
      io.to(socket.id).emit('joined');
      io.to(room.code).emit('users', room.users);
    } else {
      if (room.pass === pass) {
        socket.join(room.code);
        io.to(socket.id).emit('joined');
        io.to(room.code).emit('users', room.users);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});