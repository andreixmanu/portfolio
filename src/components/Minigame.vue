<template>
  <div id="minigame-container">
    <h1 class="text" id="title">Decrypt the Caesar Cipher</h1>
    <p class="text" id="message">{{ isCorrect ? decryptedMessage : encryptedMessage }}</p>
    <div class="number-input">
      <button @click="decrementKey" class="number-button">-</button>
      <input
        v-model.number="key"
        readonly
        class="number-display"
      />
      <button @click="incrementKey" class="number-button">+</button>
    </div>
    <button @click="decryptMessage" class="decrypt-button">Decrypt</button>
    <template v-if="error">
      <p class="text" style="color: red">{{ error }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import init, { decrypt_caesar_cipher } from "../../backend/decryptor/pkg";

export default {
  name: "Decryptor",
  setup() {
    const encryptedMessage = ref("Khoor Zruog");
    const key = ref<number>(0);
    const decryptedMessage = ref<string>("");
    const isCorrect = ref(false);
    const error = ref("");

    onMounted(async () => {
      await init();
    });

    const incrementKey = () => {
      key.value = (key.value + 1) % 26;
    };

    const decrementKey = () => {
      key.value = (key.value - 1 + 26) % 26;
    };

    const decryptMessage = () => {
      try {
        const result = decrypt_caesar_cipher(encryptedMessage.value, key.value);
        decryptedMessage.value = result.message;
        isCorrect.value = result.is_correct;
        
        if (!result.is_correct) {
          error.value = "That's not the right key. Try again!";
        } else {
          error.value = "";
        }
      } catch (e) {
        error.value = "An error occurred while decrypting.";
        isCorrect.value = false;
        decryptedMessage.value = "";
      }
    };

    return {
      encryptedMessage,
      key,
      decryptedMessage,
      decryptMessage,
      isCorrect,
      error,
      incrementKey,
      decrementKey,
    };
  },
};
</script>

<style scoped>
#minigame-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 500px;
  width: max-content;
}

.error-message {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.text {
  font-size: 2em;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 350;
  margin: 20px;
  text-align: center;
  color: white;
}

#title{
  font-size: 4em;
  margin: 20px;
  text-align: center;
  color: white;
}

#message {
  background-color: rgba(20, 20, 20, 0.9);
  width: 300px;
  display: inline-block;
  margin-top: 30px;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.number-input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  gap: 10px;
  height: 50px;
}

.number-button {
  width: 50px;
  height: 50px;
  font-size: 1.5em;
  background-color: rgba(50, 50, 50, 0.8);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(200, 200, 200, 0.8);
  padding: 0;
  box-sizing: border-box;
}

.number-button:hover {
  background-color: rgba(200, 200, 200, 0.8);
}

.number-display {
  width: 100px;
  height: 50px;
  text-align: center;
  background-color: rgba(50, 50, 50, 0.8);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  font-size: 1.5em;
  padding: 0;
  line-height: 50px;
  box-sizing: border-box;
}

.decrypt-button {
  margin: 10px auto;
  width: 300px;
  display: block;
  padding: 15px;
  font-size: 1.2em;
  font-family: 'JetBrains Mono', monospace;
  cursor: pointer;
  background-color: rgba(20, 20, 20, 0.9);
  color: white;
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

</style>
