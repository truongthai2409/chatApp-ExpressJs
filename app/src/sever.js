const express = require("express");
const app = express();
const path = require("path");
const Sever = require("socket.io");
const http = require("http");
const Filter = require("bad-words");
var qs = require("qs");
const { getUserList, addUserList, removeUserList } = require("../utils/users");

const formatAt = require("../utils/create-messages");
const port = 3000;

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = Sever(server);

// ===================================
io.on("connection", (socket) => {
  //room
  socket.on("chat message query", ({ queryString }) => {
    const param = qs.parse(queryString, {
      ignoreQueryPrefix: true,
    });
    const userRoom = param.room;
    const userName = param.user;

    socket.join(userRoom);
    //show thanh viên tham gia
    if (userRoom) {
      socket.emit(
        "chat message join",
        `Chào mừng ${userName} đã vào room: ${userRoom}`
      );
    }
    // user list
    socket.broadcast
      .to(userRoom)
      .emit(
        "chat message join",
        formatAt(`Đã có thêm thành viên ${userName} tham gia`)
      );

    //chat

    socket.on("chat message1", (message, callback) => {
      const filter = new Filter();
      if (filter.isProfane(message)) {
        return callback("Bạn đã nhập từ thiếu văn hóa", message);
      }
      io.to(userRoom).emit("chat message2", formatAt(message)); // server đến client
      callback();
    });
    //URL location
    socket.on("share location form loaction", ({ latitude, longitude }) => {
      const linkLocation = `https://www.google.com/maps?q=${latitude},${longitude}`;
      io.to(userRoom).emit("share location form server", linkLocation);
    });
    //user List
    // console.log(userRoom)

    const newUser = {
      "id": socket.id,
      userName,
      userRoom,
    };
    addUserList(newUser); 
    console.log(getUserList(userRoom));
    
    io.to(userRoom).emit("send list user", getUserList(userRoom));

    // ngắt kết nối
    // de socket trong() luc này sẽ làm socket.id hiểu nhấm nên kho chạy code
    socket.on("disconnect", (abc) => {
      removeUserList(socket.id);
      console.log(`user ${userName} disconnected`);
      console.log(getUserList(userRoom));
      socket.to(userRoom).emit("disconnect2", formatAt(`user ${userName} disconnected`));
      io.to(userRoom).emit("disconnect2", getUserList(userRoom));
    });
  });
});

server.listen(port, () => {
  console.log("listen port http://localhost:" + port);
});
