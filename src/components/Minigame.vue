<template>
  <div id="minigame-container">
    <h1 class="text" id="title">Decrypt the Caesar Cipher</h1>
    <p class="text" id="message">{{ isCorrect ? decryptedMessage : currentDecryptedText }}</p>
    <div class="number-input">
      <button @click="decrementKey" class="number-button">-</button>
      <input
        v-model.number="key"
        readonly
        class="number-display"
      />
      <button @click="incrementKey" class="number-button">+</button>
    </div>
    <button @click="decryptMessage" :disabled="!isInitialized" class="decrypt-button">
      {{ isInitialized ? 'Decrypt' : 'Loading...' }}
    </button>
    <template v-if="error">
      <p id="error-message" class="text" style="color: red">{{ error }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";

// Type for our WASM module
type WasmModule = {
  decrypt_caesar_cipher: (message: string, key: number) => { message: string; is_correct: boolean };
};

export default {
  name: "Decryptor",
  setup(props, { emit }) {
    const encryptedMessage = ref("Khoor Zruog");
    const key = ref<number>(0);
    const decryptedMessage = ref<string>("");
    const isCorrect = ref(false);
    const error = ref("");
    const isInitialized = ref(false);
    
    let wasmModule: WasmModule | null = null;

    const initializeWasm = async () => {
      try {
        console.log("Starting WASM initialization...");
        
        // Dynamic import of the module
        const module = await import("../../backend/decryptor/pkg/decryptor");
        console.log("JS module imported successfully");

        // Initialize WASM
        await module.default();
        console.log("WASM module initialized successfully");
        
        // Store module reference
        wasmModule = module;
        isInitialized.value = true;
        
        // Initialize the current decrypted text
        updateCurrentDecryption();
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error("WASM initialization error:", e);
          console.error("Error stack:", e.stack);
          error.value = `Failed to initialize decryption module: ${e.message}`;
        } else {
          error.value = "Failed to initialize decryption module";
        }
        isInitialized.value = false;
      }
    };

    onMounted(() => {
      // Only initialize in browser environment
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        initializeWasm().catch(e => {
          console.error("Failed to initialize WASM:", e);
          error.value = "Failed to initialize decryption module.";
        });
      } else {
        console.log("Skipping WASM initialization in non-browser environment");
      }
    });

    const currentDecryptedText = ref(encryptedMessage.value);
    
    // Function to decrypt the message with the current key without checking if it's correct
    const updateCurrentDecryption = () => {
      if (!wasmModule) return;
      
      try {
        const result = wasmModule.decrypt_caesar_cipher(encryptedMessage.value, key.value);
        currentDecryptedText.value = result.message;
      } catch (e) {
        console.error("Live decryption error:", e);
      }
    };
    
    const incrementKey = () => { 
      key.value = (key.value + 1) % 26;
      updateCurrentDecryption();
    };
    
    const decrementKey = () => { 
      key.value = (key.value - 1 + 26) % 26;
      updateCurrentDecryption(); 
    };

    const decryptMessage = () => {
      if (!wasmModule) {
        error.value = "Decryption module not ready.";
        return;
      }

      try {
        console.log("Attempting decryption with key:", key.value);
        const result = wasmModule.decrypt_caesar_cipher(encryptedMessage.value, key.value);
        console.log("Decryption result:", result);
        
        decryptedMessage.value = result.message;
        isCorrect.value = result.is_correct;
        
        if (result.is_correct) {
          emit("cracked");
        } else {
          error.value = "That's not the right key. Try again!";
        }
      } catch (e: unknown) {
        console.error("Decryption error:", e);
        if (e instanceof Error) {
          error.value = `An error occurred while decrypting: ${e.message}`;
        } else {
          error.value = "An error occurred while decrypting";
        }
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
      isInitialized,
      currentDecryptedText,
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
}

.text {
  font-size: 2em;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 400;
  margin: 20px;
  text-align: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}

#title{
  font-size: 4em;
  margin: 20px;
  text-align: center;
  color: white;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
  font-weight: 500;
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
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  font-weight: 500;
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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;
}

.decrypt-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.decrypt-button:hover:not(:disabled) {
  background-color: rgba(40, 40, 40, 0.9);
  transform: translateY(-2px);
}

.decrypt-button:active:not(:disabled) {
  transform: translateY(1px);
}

@media (max-width: 600px) {
  #title{
    font-size: 10vw;
    margin: 15px 10px;
    word-wrap: break-word;
    line-height: 1.2;
  }

  .text {
    font-size: 1.6em;
    margin: 15px 10px;
  }

  #message {
    width: 80%;
    max-width: 300px;
  }

  #error-message{
    font-size: 5vw;
    padding: 0 10px;
    word-wrap: break-word;
  }

  .decrypt-button {
    width: 80%;
    max-width: 300px;
  }
}

@media (min-width: 600px) {
  #minigame-container{
    width: max-content;
  }
}

</style>
