<template>
    <div ref="threeCanvas" class="three-canvas"></div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import THREE from 'three/build/three.cjs';
  
  export default defineComponent({
    name: 'ThreeBackground',
    setup() {
      const threeCanvas = ref<HTMLDivElement | null>(null);
  
      onMounted(() => {
        if (!threeCanvas.value) return;
  
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
  
        renderer.setSize(window.innerWidth, window.innerHeight);
        threeCanvas.value.appendChild(renderer.domElement);
  
        // Wireframe sphere
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        const wireframeSphere = new THREE.Mesh(geometry, material);
        scene.add(wireframeSphere);
  
        camera.position.z = 10;
  
        // Animation loop
        function animate() {
          requestAnimationFrame(animate);
          wireframeSphere.rotation.x += 0.01;
          wireframeSphere.rotation.y += 0.01;
          renderer.render(scene, camera);
        }
        animate();
  
        // Handle resizing
        window.addEventListener('resize', () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        });
      });
  
      return { threeCanvas };
    }
  });
  </script>
  
  <style>
  .three-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  </style>
  