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

const sendAdminUserCount = () => {
    io.emit("adminUsercount", user.length);
}

function matchAndRemove() {
    let males = []; // 存储 male 元素的索引
    let females = []; // 存储 female 元素的索引

    // 找到男性和女性元素的索引
    for (let i = 0; i < matchList.length; i++) {
        if (matchList[i].sex === 'male') {
            males.push(i);
        } else {
            females.push(i);
        }
    }

    // 遍历异性匹配
    while (males.length > 0 && females.length > 0) {
        let maleIndex = males.shift();
        let femaleIndex = females.shift();

        // 将匹配成功的元素对添加到 matchSuccessful 中
        matchSuccessful.push([matchList[maleIndex], matchList[femaleIndex]]);

        // 从 matchList 中删除匹配成功的元素
        matchList.splice(Math.max(maleIndex, femaleIndex), 1);
        matchList.splice(Math.min(maleIndex, femaleIndex), 1);

        // 重置索引，因为数组已经被改变
        males = males.map(index => index > Math.max(maleIndex, femaleIndex) ? index - 1 : index);
        females = females.map(index => index > Math.min(maleIndex, femaleIndex) ? index - 1 : index);
    }

    // 如果没有异性，则进行同性匹配
    while (matchList.length >= 2) {
        // 将匹配成功的元素对添加到 matchSuccessful 中
        matchSuccessful.push([matchList[0], matchList[1]]);
        // 从 matchList 中删除匹配成功的元素
        matchList.splice(0, 2);
    }
}

// 根据匹配列表长度动态计算匹配等待时间
function calculateMatchWaitTime() {
    const baseWaitTime = 2500; // 基础等待时间，单位：毫秒
    const maxWaitTime = 10000; // 最大等待时间，单位：毫秒
    const lengthRatio = Math.min(matchList.length / 5, 1); // 匹配列表长度与基础等待时间的比例，最大为 1
    return baseWaitTime + lengthRatio * (maxWaitTime - baseWaitTime);
}

// Socket.IO 事件处理
io.on("connection", (socket) => {
    user.push(socket.id);
    sendAdminUserCount(); // 新用户连接时发送在线用户数量给管理员

    socket.on("disconnect", () => {
        user.splice(user.indexOf(socket.id), 1);
        sendAdminUserCount(); // 用户断开连接时发送在线用户数量给管理员
    });

    socket.on("userMatch", (Info) => {
        matchList.push(Info); // 将新用户添加到匹配列表中

        // 根据匹配列表长度动态计算匹配等待时间
        const waitTime = calculateMatchWaitTime();

        // 在等待一段时间后进行匹配
        setTimeout(() => {
            matchAndRemove(); // 进行匹配并移除操作
            // console.log('matchSuccessful:', matchSuccessful); // 输出匹配成功的元素对
            // console.log('remaining:', matchList); // 输出剩余的未匹配元素
        }, waitTime);
    });

    socket.on("userCancelMatch", (Info) => {
        matchList.splice(
            matchList.findIndex((user) => user.id === Info.id),
            1
        ); // 从匹配列表中移除取消匹配的用户
        console.log(matchList);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Socket.IO server listening on port ${PORT}`);
});
