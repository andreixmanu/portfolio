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
          <ProceedButton
            :class="{ 'fade-in': showButton }"
            text="Continue"
            @handleContinue="handleContinue"
          />
        </div>
      </transition>
      <Transition name="fade">
        <div class="minigame-container" v-if="showMinigame">
          <Minigame @cracked="cracked" />
        </div>
      </Transition>
      <Transition name="fade">
        <Portfolio v-if="isCracked" />
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
import Portfolio from "./components/Portfolio.vue";

export default defineComponent({
  name: "App",
  components: { ThreeBackground, AnimatedTitle, ProceedButton, Minigame, Portfolio },
  setup() {
    const showButton = ref(false);
    const showComponents = ref(true);
    const showMinigame = ref(false);
    const isCracked = ref(false);
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

    const cracked = () => {
      showMinigame.value = false;
      setTimeout(() => {
        isCracked.value = true;
      }, 2000); // Add 2 second delay before showing portfolio
    };

    return { showButton, showComponents, showMinigame, handleContinue, background, cracked, isCracked };
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
  z-index: 1;
  color: white;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.text-container {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  transition: opacity 2s ease-out;
}

.proceed-button {
  display: block;
  position: absolute;
  left: 30%;
  top: 55%;
  width: fit-content;
  text-align: center;
  will-change: opacity;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}

@media (max-width: 600px) {
  .text-container {
    margin-top: -10vh;
  }

  .proceed-button {
    left: 10%;
  }
}

.fade-in {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
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

#portfolio {
  color: white;
  animation: fadeIn 2s ease-in;
  padding: 2rem;
  max-width: max-content;
  margin: 0 auto;
}

</style>


