<template>
  <div id="app">
    <ThreeBackground />
    <div class="content">
      <div class="text-container">
        <AnimatedTitle text="Welcome to my portfolio" />
        <ProceedButton text="Proceed" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThreeBackground from './views/ThreeBackground.vue';
import AnimatedTitle from './components/AnimatedTitle.vue';
import ProceedButton from './components/ProceedButton.vue';

export default defineComponent({
  name: 'App',
  components: { ThreeBackground, AnimatedTitle, ProceedButton }
});
</script>

Portfolio <style>

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.content {
  position: relative;
  z-index: 1; /* Ensures it stays above Three.js canvas */
  color: white;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.text-container {
  flex-direction: column; /* Align items to the left */
  margin-left: 10%;
}

.proceed-button {
  align-items: center;
}

</style>

