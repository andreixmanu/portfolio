<template>
  <button
    class="proceed-button"
    @click="proceed"
  >
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProceedButton',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const proceed = ref<() => void>(() => {});
    const buttonText = ref(props.text);
    return { proceed, buttonText };
  }
});
</script>

<style scoped lang="scss">
@use 'sass:math';

.proceed-button {
  color: grey;
  position: relative;
  font-family: 'JetBrains Mono', monospace;
  border-left: none;
  border-right: none;
  background-color: transparent;
  font-size: 25px;
  // margin: 70px 200px;
  animation: glitch 5s 5s infinite;
}

.proceed-button::before {
  content: attr(data-text);
  position: absolute;
  left: -2px;
  text-shadow: -5px 0 magenta;
  overflow: hidden;
  top: 0;
  animation: noise-1 3s linear infinite alternate-reverse, glitch 5s 5.05s infinite;
}

.proceed-button::after {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  text-shadow: -5px 0 lightgreen;
  overflow: hidden;
  top: 0;
  animation: noise-2 3s linear infinite alternate-reverse, glitch 5s 5s infinite;
}

@keyframes glitch {
  1%{ transform: rotateX(10deg) skewX(90deg);}
  2%{ transform: rotateX(0deg) skewX(0deg);}
}

@keyframes noise-1 {
  $steps: 30;
  @for $i from 1 through $steps {
    #{percentage($i*(1/$steps))} {
      $top: math.random(100);
      $bottom: math.random(101 - $top);
      clip-path: inset(#{$top}px 0 #{$bottom}px 0);
    }
  }
}

@keyframes noise-2 {
  $steps: 30;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      $top: math.random(100);
      $bottom: math.random(101 - $top);
      clip-path: inset(#{$top}px 0 #{$bottom}px 0);
    }
  }
}

@keyframes fudge {
  from { transform: translate(0px, 0px);}
  to { transform: translate(0px, 2%); }
}

</style>