const express = require("express");
const app = express();
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
// const Filter = require("bad-words");
// const qs = require("qs");
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');

const formatMessage = require("./utils/create-messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const port = 3000;

const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketio(server);

// ===================================
const botName = "Chat App";

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    try {
      let user = {
        id: "",
        username: "",
        room: "",
      };
      user = getCurrentUser(socket.id);
      if (!user.room) {
        user.room = "";
      }
      io.to(user.room).emit("message", formatMessage(user.username, msg));
    } catch (error) {
      io.to(user).emit("message", formatMessage(user.username, msg));
    }
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log("listen port http://localhost:" + port);
});
