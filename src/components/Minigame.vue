<template>
  <div id="minigame-container">
    <h1 class="text">Decrypt the Message</h1>
    <p class="text">Encrypted Message:</p>
    <p class="text"> {{  encryptedMessage }}</p>
    <input
      v-model.number="key"
      type="number"
      placeholder="Enter decryption key"
    />
    <button @click="decryptMessage">Decrypt</button>
    <p class="text" v-if="decryptedMessage">Decrypted Message:</p>
    <p class="text">  {{ decryptedMessage }} </p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import init, { decrypt_caesar_cipher } from "../../backend/decryptor/pkg";

export default {
  name: "Decryptor",
  setup() {
    const encryptedMessage = ref("Khoor Zruog"); // The message to be decrypted
    const key = ref<number>(3); // The decryption key input by the user
    const decryptedMessage = ref<string>("Hello World"); // The decrypted message

    // Initialize the WASM module
    onMounted(async () => {
      await init();
      console.log("Encryped message: ", decryptedMessage);
    });

    // Method to decrypt the message using Rust WASM function
    const decryptMessage = () => {
      if (key.value === null) {
        decryptedMessage.value = "Please enter a valid decryption key.";
        return;
      }
      decryptedMessage.value = decrypt_caesar_cipher(
        encryptedMessage.value,
        key.value,
      );
    };

    return {
      encryptedMessage,
      key,
      decryptedMessage,
      decryptMessage,
    };
  },
};
</script>

<style scoped>

.text {
  font-size: 2em;
  margin: 20px;
  text-align: center;
  color: white;
}

input {
  margin: 10px auto;
  padding: 5px;
  font-size: 1em;
  border-color: white;
  display: block;
}

button {
  margin: 10px auto;
  display: block;
  padding: 5px 10px;
  font-size: 1em;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
}
button:hover {
  background-color: #0056b3;
}
</style>
