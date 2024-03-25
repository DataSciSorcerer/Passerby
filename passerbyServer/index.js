const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

const user = [];

// Socket.IO 事件处理
io.on("connection", (socket) => {
  //   console.log(`a user connected:${socket.id}`);
  user.push(socket.id);
  console.log(user.length);

  socket.on("disconnect", (socket) => {
    user.splice(user.indexOf(socket.id), 1);
    console.log(user.length);
  });

  socket.on("userInto", (Info) => {
    console.log(Info);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server listening on port ${PORT}`);
});
