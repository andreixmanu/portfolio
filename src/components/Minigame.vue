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
    <button @click="decryptMessage" :disabled="!isInitialized" class="decrypt-button">
      {{ isInitialized ? 'Decrypt' : 'Loading...' }}
    </button>
    <template v-if="error">
      <p class="text" style="color: red">{{ error }}</p>
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

    const incrementKey = () => { 
      key.value = (key.value + 1) % 26; 
    };
    
    const decrementKey = () => { 
      key.value = (key.value - 1 + 26) % 26; 
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

.decrypt-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  #title{
    font-size: 10vw;
  }

  #error-message {
    font-size: 6vw;
  }
  
  
}

</style>
