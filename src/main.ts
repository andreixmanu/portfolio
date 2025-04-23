import "./main.css";
import { createApp } from "vue";
import App from "./App.vue";
import '@fortawesome/fontawesome-free/css/all.min.css';


async function startApp() {
  try {
    const app = createApp(App);
    app.mount("#app");
  } catch (error) {
    console.error("Failed to initialize Wasm module:", error);
  }
}

startApp();
