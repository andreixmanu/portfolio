<template>
  <div id="title-container">
    <h1 id="title">
      <span>{{ displayedText }}</span><span v-if="showCursor" class="blinking-cursor">|</span>
    </h1>
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
    const displayedText = ref('');
    const showCursor = ref(true);

    onMounted(() => {
      let index = 0;
      const text = props.text;

      function typeWriter() {
        if (index < text.length) {
          displayedText.value += text.charAt(index);
          index++;
          setTimeout(typeWriter, 80);
        } else {
          emit('animation-complete');
        }
      }
      typeWriter();

      // Blinking cursor interval
      setInterval(() => {
        showCursor.value = !showCursor.value;
      }, 500);
    });

    return { displayedText, showCursor };
  }
});
</script>

<style scoped>
#title {
  color: whitesmoke;
  position: relative;
  font-size: 7vw; /* Responsive font size based on viewport width */
  font-family: 'JetBrains Mono', monospace;
  font-weight: 350;
}

.blinking-cursor {
  display: inline-block;
  width: 10px;
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

@media (max-width: 600px) {
  #title-container {
    justify-content: flex-start;
    text-align: left;
  }
  #title {
    text-align: left;
    font-size: 9vw;
  }
  .blinking-cursor {
    height: 8vw;
  }
}

@media (min-width: 1200px) {
  #title {
    font-size: 60px;
  }
  .blinking-cursor {
    height: 45px;
  }
}
</style>