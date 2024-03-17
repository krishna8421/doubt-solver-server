import http from "http";
import { Server } from "socket.io";
import { app } from "./app.js";

const server = http.createServer(app);

const io = new Server(server);

const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // When a client connects, they should emit a "register" event with their user id
  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  });
});

export { io, userSocketMap };
