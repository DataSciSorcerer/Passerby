import { createRouter, createWebHistory } from "vue-router";

// 使用动态导入方式引入页面组件
const Index = () => import("../pages/index/index.vue");
const Chat = () => import("../pages/chat/index.vue");
const Register = () => import("../pages/register/index.vue");

const routes = [
  { path: "/", redirect: "/index/register" },
  {
    path: "/index",
    component: Index,
    children: [
      {
        path: "chat",
        component: Chat,
      },
      {
        path: "register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
