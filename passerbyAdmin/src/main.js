import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import io from 'socket.io-client';

const app = createApp(App);

const socket = io('http://localhost:3000'); // 连接到 Socket.IO 服务器

// 使用 provide 将 socket 实例注入全局
app.provide('socket', socket);

app.mount("#app");
