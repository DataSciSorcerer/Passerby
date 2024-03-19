import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
import Particles from "vue3-particles";
import { install } from "@icon-park/vue-next/es/all";
// import "@/assets/fonts/fonts.css";

const app = createApp(App);
const pinia = createPinia();

install(app); 

app.use(pinia);
app.use(Particles);
app.use(router);


app.mount("#app");
