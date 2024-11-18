
<template>
    <h1 id="title" ref="title">{{ text }}</h1>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import ThreeBackground from '../views/ThreeBackground.vue';
  
  export default defineComponent({
    name: 'AnimatedText',
    props: {
      text: {
        type: String,
        required: true
      }
    },
    setup() {
      const title = ref<HTMLElement | null>(null);
  
      onMounted(() => {
        if (!title.value) return;
  
        // Animation logic
        let angle = 0;
        function animate() {
          requestAnimationFrame(animate);
          angle += 0.02;
          if (title.value) {
            const opacity = (Math.sin(angle) + 1) / 2;
            title.value.style.opacity = Math.max(opacity, 0.3) + '';
          }
        }
        animate();
      });
  
      return { title };
    }
  });
  </script>
  
<style scoped>
#title {
    color: 0x7c7c7c;
    position: relative;
    font-size: 45px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 300;
}
  </style>