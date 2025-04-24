import "./main.css";
import { createApp } from "vue";
import App from "./App.vue";
import '@fortawesome/fontawesome-free/css/all.min.css';

async function initializeApp() {
  // Return early if not in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.log("Application initialized in non-browser environment");
    return;
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
  }

  try {
    const app = createApp(App);
    app.mount("#app");
  } catch (error) {
    console.error("Failed to initialize application:", error);
  }
}

// Initialize the app
initializeApp().catch(error => {
  console.error("Critical initialization error:", error);
});
