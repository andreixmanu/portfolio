<template>
  <div id="app">
    <ThreeBackground ref="background" />
    <div class="content">
      <div class="text-container">
        <AnimatedTitle text="Welcome to my Portfolio" @animation-complete="showButton = true" />
        <transition name="fade">
        <ProceedButton :class="{ 'fade-in': showButton }" text="Continue" @handleContinue="handleContinue"  />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ThreeBackground from './views/Background.vue';
import AnimatedTitle from './components/AnimatedTitle.vue';
import ProceedButton from './components/ProceedButton.vue';

export default defineComponent({
  name: 'App',
  components: { ThreeBackground, AnimatedTitle, ProceedButton },
  setup() {
      const showButton = ref(false);
      const showComponents = ref(false);
      const background = ref(null);

      const handleContinue = () => {
        showComponents.value = true;

        const backgroundInstance = background.value as any;
        console.assert(backgroundInstance);
        backgroundInstance.moveSphere();
      }
    return { showButton, showComponents, handleContinue, background };
  },
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
  opacity: 0;
  transition: opacity 2s ease-in-out;
}

.fade-in {
  opacity: 1;
}

</style>

