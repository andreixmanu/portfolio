<template>
    <div ref="threeCanvas" class="three-canvas"></div>
</template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import * as THREE from 'three';
  
  export default defineComponent({
    name: 'ThreeBackground',
    setup() {
      const threeCanvas = ref<HTMLDivElement | null>(null);
  
      onMounted(() => {
        if (!threeCanvas.value) return;
  
        // Scene setup
        const scene = new THREE.Scene(); // Create a new scene
        scene.background = new THREE.Color(0x000000); // Set the background color to black (default)
        // You can change the color to any other color, e.g., 0xffffff for white
  
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Create a new camera
        const renderer = new THREE.WebGLRenderer(); // Create a new WebGL renderer
  
        renderer.setSize(window.innerWidth, window.innerHeight);
        threeCanvas.value.appendChild(renderer.domElement);
  
        // Wireframe sphere
        /*
        * Colors:
        * 0x7A1CAC - Purple
        * 0xF2F2F2 - Silver
        * 0xEBD3F8 - Light purple
        */

        // Wireframe geometry
        const geometry = new THREE.SphereGeometry(6, 48, 48); // Create a sphere geometry
        const wireframeGeometry = new THREE.WireframeGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x7c7c7c });
        const wireframeSphere = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        scene.add(wireframeSphere);


        camera.position.z = 7; // Set the camera's position to a distance of 8 units from the origin
        camera.position.x = -8; // Move the camera to the left
        camera.position.y = 1; // Move the camera up
  
        // Animation loop
        function animate() {
          requestAnimationFrame(animate);
          wireframeSphere.rotation.x += 0.0005; // Rotate the wireframe sphere around the X-axis
          wireframeSphere.rotation.y += 0.001; // Rotate the wireframe sphere around the Y-axis
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