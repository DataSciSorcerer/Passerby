import { createApp, provide } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
import Particles from "vue3-particles";
import { install } from "@icon-park/vue-next/es/all";
import io from 'socket.io-client';

const app = createApp(App);
const pinia = createPinia();

install(app); 

const socket = io('http://localhost:3000'); // 连接到 Socket.IO 服务器

// 使用 provide 将 socket 实例注入全局
app.provide('socket', socket);

app.use(pinia);
app.use(Particles);
app.use(router);

app.mount("#app");
