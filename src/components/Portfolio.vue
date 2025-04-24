<template>
  <div id="portfolio">
    <transition name="fade">
      <div class="portfolio-container">
        <div class="contact-content">
          <div class="contact-header">
            <img id="pfp" src="../assets/portfolio-photo.jpg" alt="Andrei's Portrait" class="portrait" />
            <h1 id="title" class="contact">Hi, <br> I'm Andrei!</h1>
          </div>
          <br>
          <p id="long-desc">I am a 22 years old CS student, passionate about programming and technology.
            I mostly work with Rust and TypeScript, but I also have experience with C++, Python, and Java.
            My main field of interest is cybersecurity, but I also enjoy low level programming. Beyond the code, 
            I'm fascinated by the underlying mechanisms of computer systems and the importance of digital security.
          You can follow me here: </p>
          <div class="social-icons">
            <a href="https://github.com/andreixmanu" target="_blank" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/andrei-manu/" target="_blank" title="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://x.com/andreixmanu" target="_blank" title="Twitter">
              <i class="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.youtube.com/@uman2970/" target="_blank" title="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
          <p id="long-desc">I am currently looking for internships or job opportunities in the field of cybersecurity, 
            programming, or low level programming. If you are interested in collaborating with me, feel free to reach out!</p>
          <a href="mailto:andreixmanu@proton.me" class="mail">Contact me via email</a>
        </div>
        <div class="portfolio-content">
          <h1>Interactive Portfolio Experience</h1>
          <div class="description">
            <div class="features">
              <div class="feature-section frontend">
                <h2>Frontend</h2>
                <ul>
                  <li>⚡ Built with Vue 3 and TypeScript</li>
                  <li>🎨 Three.js-powered dynamic background</li>
                  <li>✨ Smooth animations and transitions</li>
                  <li>🎮 Interactive minigame gateway</li>
                </ul>
              </div>
              <div class="feature-section backend">
                <h2>Backend</h2>
                <ul>
                  <li>🦀 Rust-powered cryptography engine</li>
                  <li>🚀 WebAssembly integration</li>
                  <li>🔒 Caesar cipher implementation</li>
                  <li>🔄 Seamless JavaScript-Rust interop</li>
                </ul>
              </div>
            </div>
            <div class="tech-note">
              <p>This project showcases the power of WebAssembly by implementing the decryption logic in Rust, 
              compiled to WASM for optimal performance while maintaining the security of the original code.</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Portfolio',
});
</script>

<style scoped>
#portfolio {
  max-width: max-content;
  margin: 0 auto;
  font-family: "JetBrains Mono", monospace;
}

#pfp {
  width: 250px;
  height: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  padding: 5px;
}

.portfolio-container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.portfolio-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 3px solid transparent;
  border-image: linear-gradient(45deg, #4ecdc4, #ff6b6b) 1;
  border-radius: 15px;
  width: 55%;
}

.contact-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 3px solid transparent;
  width: 45%;
  backdrop-filter: blur(10px);
  border-image: linear-gradient(45deg, #4ecdc4, #ff6b6b) 1;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #4ecdc4;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.feature-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.feature-section:hover {
  transform: translateY(-5px);
}

.backend {
  border-left: 3px solid #ff6b6b;
}

.frontend {
  border-left: 3px solid #4ecdc4;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

li {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: transform 0.2s ease;
}

li:hover {
  transform: translateX(10px);
}

.tech-note {
  margin-top: 3rem;
  padding: 1rem;
  background: rgba(255, 99, 71, 0.1);
  border-radius: 8px;
  border-left: 3px solid #ff6b6b;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-content h2 {
  margin-bottom: 1rem;
  color: #4ecdc4;
}

.contact-content ul {
  list-style: none;
  padding: 0;
}

.contact-content li {
  margin: 1rem 0;
}

.contact-content a {
  color: #4ecdc4;
  text-decoration: none;
}

.contact-content a:hover {
  text-decoration: underline;
}

.contact {
  font-size: 1rem;
  color: white;
}

#title {
  padding-left: 3rem;
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
}

#long-desc{
  font-family: "JetBrains Mono", monospace;
  font-size: 22px;
  line-height: 1.4;
}

.social-media-list{
  align-items: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.2rem;
}

.social-icons a {
  color: #ccc;
  font-size: 3rem;
  transition: transform 0.3s, color 0.3s;
}

.social-icons a:hover {
  color: #00ffff;
  transform: scale(1.2);
  text-shadow: 0 0 5px #00ffff;
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
  }
  
  #portfolio {
    padding: 1rem;
  }
}

.mail{
  display: inline-block;
  font-size: large;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

</style>