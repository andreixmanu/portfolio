<template>
  <div id="app">
    <ThreeBackground />
    <div class="content">
      <!-- Your portfolio content -->
      <h1 id="title">Welcome to My Portfolio</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThreeBackground from './views/ThreeBackground.vue';

export default defineComponent({
  name: 'App',
  components: { ThreeBackground }
});
</script>

Portfolio <style>
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

#title {
  color: white;
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  font-family: 'JetBrains Mono', monospace;
}

.content {
  position: absolute;
  z-index: 1; /* Ensures it stays above Three.js canvas */
  color: white;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

