use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct DecryptionResult {
    message: String,
    is_correct: bool,
}

#[wasm_bindgen]
impl DecryptionResult {
    #[wasm_bindgen(getter)]
    pub fn message(&self) -> String {
        self.message.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn is_correct(&self) -> bool {
        self.is_correct
    }
}

#[wasm_bindgen]
pub fn decrypt_caesar_cipher(encrypted: &str, key: u8) -> DecryptionResult {
    let decrypted: String = encrypted
        .chars()
        .map(|c| {
            if c.is_ascii_alphabetic() {
                let first = if c.is_ascii_lowercase() { b'a' } else { b'A' };
                let shifted = (c as u8 - first + 26 - key) % 26 + first;
                shifted as char
            } else {
                c
            }
        })
        .collect();
    
    let is_correct = decrypted.contains("Hello World");
    
    DecryptionResult {
        message: decrypted,
        is_correct,
    }
}