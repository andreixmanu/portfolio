<template>
  <div id="minigame-container">
    <h1 class="text" id="title">Decrypt the Caesar Cipher</h1>
    <p class="text">{{ encryptedMessage }}</p>
    <input
      v-model.number="key"
      placeholder="Enter a number"
    />
    <button @click="decryptMessage">Decrypt</button>
    <template v-if="error">
      <p class="text" style="color: red">{{ error }}</p>
    </template>
    <template v-if="isCorrect">
      <p class="text">Congratulations! You've cracked the cipher!</p>
      <p class="text">Decrypted Message:</p>
      <p class="text">{{ decryptedMessage }}</p>
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
    const key = ref<number>(1);
    const decryptedMessage = ref<string>("");
    const isCorrect = ref(false);
    const error = ref("");

    onMounted(async () => {
      await init();
    });

    const decryptMessage = () => {
      if (key.value === null) {
        error.value = "Please enter a valid decryption key.";
        isCorrect.value = false;
        return;
      }

      try {
        // Get both the decrypted message and whether it's correct
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

input {
  margin: 20px auto;
  padding: 12px 20px;
  font-size: 1.2em;
  width: 200px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  background-color: rgba(50, 50, 50, 0.8);
  color: white;
  display: block;
  text-align: center;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

button {
  margin: 10px auto;
  display: block;
  padding: 5px 10px;
  font-size: 1em;
  font-family: 'JetBrains Mono', monospace;
  cursor: pointer;
  background-color: rgba(150, 150, 150, 0.8);
  color: white;
  border: black;
  border-radius: 5px;
}

</style>
