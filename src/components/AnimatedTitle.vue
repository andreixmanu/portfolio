
<template>
  <div id="title-container">
    <h1 id="title" ref="title"></h1>
    <span id="cursor" ref="cursor"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'AnimatedText',
  props: {
    text: {
      type: String,
      required: true
    }
  },

  setup(props, { emit }) {
    const title = ref<HTMLElement | null>(null);
    const cursor = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (!title.value || !cursor.value) return;

    // Typewriter effect
    let index = 0;
    const text = props.text;
    title.value.textContent = '';

    function typeWriter() {
      if (index < text.length) {
        if (title.value) {
          title.value.textContent += text.charAt(index);
          index++;
          setTimeout(typeWriter, 80); // Adjust the speed of the typewriter effect
        }
      } else {
          emit('animation-complete');
        }
      }
      typeWriter();
    });
    
    return { title, cursor };
  }
});
</script>

<style scoped>

#title-container {
  display: flex;
  align-items: center;
  position: relative;
}

#title {
  color: 0x7c7c7c;
  position: relative;
  font-size: 45px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 300;
}

#cursor {
width: 10px;
height: 45px;
background-color: white;
margin-left: 5px;
animation: blink 1s step-end infinite;
}

@keyframes blink {
from, to {
  opacity: 1;
}
50% {
  opacity: 0;
}
}
</style>