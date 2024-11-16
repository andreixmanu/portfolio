<template>
  <div>
    <h1>Welcome to My Portfolio</h1>
    <button @click="playGame">Play Game</button>
  </div>
</template>

<script>
export default {
  methods: {
    playGame() {
      console.log('Game starting...');
    },
  },
};
</script>
