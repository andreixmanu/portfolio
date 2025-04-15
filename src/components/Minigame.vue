<template>
  <div id="minigame-container">
    <h1 class="text">Decrypt the Message</h1>
    <p class="text">Encrypted Message:</p>
    <p class="text">{{ encryptedMessage }}</p>
    <input
      v-model.number="key"
      type="number"
      placeholder="Enter decryption key"
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
