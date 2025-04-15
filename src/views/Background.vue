<template>
  <div ref="threeCanvas" class="three-canvas"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as THREE from "three";

export default defineComponent({
  name: "Background",
  setup(props, { emit }) {
    const threeCanvas = ref<HTMLDivElement | null>(null);
    let sphere: any;

    // Variables for animation
    let isMoving = false;
    let targetZ = 5;
    let targetX = -8;
    let targetY = 0;
    let startX = 0;
    let startY = 0;
    let startZ = 0;
    let moveStartTime = 0;
    const moveDuration = 2000; // Duration in milliseconds

    // Easing function for ease-in-out
    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const createSphere = () => {
      if (!threeCanvas.value) return;

      // Scene setup
      const scene = new THREE.Scene(); // Create a new scene
      scene.background = new THREE.Color(0x000000); // Set the background color to black (default)
      // You can change the color to any other color, e.g., 0xffffff for white

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      ); // Create a new camera
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

      // Sphere setup
      const geometry = new THREE.SphereGeometry(6, 48, 48);
      const material = new THREE.MeshBasicMaterial({
        color: 0x7c7c7c,
        wireframe: true,
      });
      const wireframeSphere = new THREE.Mesh(geometry, material);
      scene.add(wireframeSphere);

      camera.position.z = 7; // Set the camera's position to a distance of 8 units from the origin
      camera.position.x = -8; // Move the camera to the left
      camera.position.y = 1; // Move the camera up

      // Animation loop
      const animate = (time: number) => {
        requestAnimationFrame(animate);

        if (sphere) {
          // Rotate the sphere
          sphere.rotation.x += 0.0;
          sphere.rotation.y += 0.0005;

          // Move sphere towards targetZ over moveDuration milliseconds
          if (isMoving) {
            const elapsed = time - moveStartTime;
            const t = Math.min(elapsed / moveDuration, 1); // Normalize time to [0, 1]
            const easedT = easeInOutQuad(t); // Apply easing

            // Interpolate position with easing
            sphere.position.x = startX + (targetX - startX) * easedT;
            sphere.position.y = startY + (targetY - startY) * easedT;
            sphere.position.z = startZ + (targetZ - startZ) * easedT;

            if (t >= 1) isMoving = false; // Stop moving when the animation completes
          }
        }
        renderer.render(scene, camera);
      };
      animate(performance.now());

      // Handle resizing
      window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });

      return wireframeSphere;
    };

    const moveSphere = () => {
      if (sphere) {
        moveStartTime = performance.now();
        isMoving = true;
      }
    };

    onMounted(() => {
      sphere = createSphere();
      if (!sphere) throw new Error("createSphere returned null");
    });

    return { threeCanvas, moveSphere };
  },
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
