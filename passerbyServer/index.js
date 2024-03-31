const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server, {
  cors: {
    origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    methods: ["GET", "POST"],
  },
});

const user = [];
const matchList = [];
const matchSuccessful = [];

const adminUserCount = () => {
  io.emit("adminUsercount", user.length);
};

function matchAndRemove() {
  let males = [];
  let females = [];

  for (let i = 0; i < matchList.length; i++) {
    if (matchList[i].sex === "male") {
      males.push(i);
    } else {
      females.push(i);
    }
  }

  while (males.length > 0 && females.length > 0) {
    const maleIndex = males.shift();
    const femaleIndex = females.shift();

    const pair = [matchList[maleIndex], matchList[femaleIndex]];
    matchSuccessful.push(pair);

    // 移除匹配成功的用户
    matchList.splice(Math.max(maleIndex, femaleIndex), 1);
    matchList.splice(Math.min(maleIndex, femaleIndex), 1);

    males = males.map((index) =>
      index > Math.max(maleIndex, femaleIndex) ? index - 1 : index
    );
    females = females.map((index) =>
      index > Math.min(maleIndex, femaleIndex) ? index - 1 : index
    );

    // 向匹配成功的两个用户发送匹配成功的事件
    io.to(pair[0].socketId).emit("matchSuccess", formatMatchSuccess(pair[1]));
    io.to(pair[1].socketId).emit("matchSuccess", formatMatchSuccess(pair[0]));
  }

  while (matchList.length >= 2) {
    const pair = [matchList[0], matchList[1]];
    matchSuccessful.push(pair);
    matchList.splice(0, 2);

    io.to(pair[0].socketId).emit("matchSuccess", formatMatchSuccess(pair[1]));
    io.to(pair[1].socketId).emit("matchSuccess", formatMatchSuccess(pair[0]));
  }

  // 清空matchList中的用户socketId，以防止内存泄漏
  matchList.forEach((user) => delete user.socketId);
}

function calculateMatchWaitTime() {
  const baseWaitTime = 2500;
  const maxWaitTime = 10000;
  const lengthRatio = Math.min(matchList.length / 5, 1);
  return baseWaitTime + lengthRatio * (maxWaitTime - baseWaitTime);
}

function formatMatchSuccess(user) {
  return {
    sex: user.sex,
    socketId: user.socketId // 只发送性别和socketId
  };
}

io.on("connection", (socket) => {
  user.push(socket.id);
  console.log(user)
  adminUserCount(); // 新用户连接时发送在线用户数量给管理员

  socket.on("disconnect", () => {
    user.splice(user.indexOf(socket.id), 1);
    adminUserCount(); // 用户断开连接时发送在线用户数量给管理员
  });

  socket.on("userMatch", (info) => {
    info.socketId = socket.id; // 存储用户的socketId
    matchList.push(info); // 将新用户添加到匹配列表中

    const waitTime = calculateMatchWaitTime();

    setTimeout(() => {
      matchAndRemove(); // 进行匹配并移除操作
    }, waitTime);
  });

  socket.on("userCancelMatch", (info) => {
    matchList.splice(
      matchList.findIndex((user) => user.id === info.id),
      1
    );
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server listening on port ${PORT}`);
});
