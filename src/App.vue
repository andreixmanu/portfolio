<template>
  <div id="app">
    <ThreeBackground ref="background" />
    <div class="content">
      <transition name="fade">
        <div class="text-container" v-if="showComponents">
          <AnimatedTitle
            text="Welcome to my Portfolio"
            @animation-complete="showButton = true"
          />
          <transition name="fade">
            <ProceedButton
              :class="{ 'fade-in': showButton }"
              text="Continue"
              @handleContinue="handleContinue"
            />
          </transition>
        </div>
      </transition>
      <Transition name="fade">
        <div class="minigame-container" v-if="showMinigame">
          <Minigame />
        </div>
      </Transition>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import ThreeBackground from "./views/Background.vue";
import AnimatedTitle from "./components/AnimatedTitle.vue";
import ProceedButton from "./components/ProceedButton.vue";
import Minigame from "./components/Minigame.vue";

export default defineComponent({
  name: "App",
  components: { ThreeBackground, AnimatedTitle, ProceedButton, Minigame },
  setup() {
    const showButton = ref(false);
    const showComponents = ref(true);
    const showMinigame = ref(false);
    const background = ref(null);

    const handleContinue = () => {
      showComponents.value = false;
      
      setTimeout(() => {
        showMinigame.value = true;
      }, 2000); // Delay before showing the minigame

      const backgroundInstance = background.value as any;
      console.assert(backgroundInstance);
      backgroundInstance.moveSphere();
    };

    return { showButton, showComponents, showMinigame, handleContinue, background };
  },
});
</script>

<style>
html,
body {
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
  transition: opacity 2s ease-out;
}

.proceed-button {
  align-items: center;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}

.fade-in {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.minigame-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

#minigame {
  width: 500px;
  height: 500px;
  padding: 20px;
}
</style>


