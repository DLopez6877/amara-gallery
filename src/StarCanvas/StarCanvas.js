import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import spaceImg from "/space.png";
import amaraImg from "/amara.jpg";
import { createGlowTexture } from "./createGlowTexture.js";
import StarPositionGenerator from "./StarPositionGenerator.js";
import gsap from "gsap";

export function StarCanvas() {
  const container = document.createElement("div");
  const canvas = createCanvas();
  const containerPadding = 16;
  container.appendChild(canvas);

  const { scene, camera, renderer } = initializeScene(canvas);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.mouseButtons.RIGHT = null;
  controls.minDistance = 20;
  controls.maxDistance = 520;
  const planetMesh = createPlanet(scene);
  const stars = createStars(scene);

  let isSpinning = false;
  let isAnimatingTransition = false;
  let transitionStartTime = 0;
  let transitionDuration = 0;
  let initialPositions = [];
  let targetPositions = [];
  let onTransitionComplete = null;

  container.spinStars = () => {
    isSpinning = true;
  };

  container.enter = async function () {
    return new Promise(async (resolve) => {
      controls.minDistance = 0;
      controls.enabled = false;
      await moveCamera(0, 0, 420);
      await startAnimateStars();

      setTimeout(async () => {
        rotateCamera(-2.08, 1.53, 2.08);
        await moveCamera(759.75, 7.74, -4.67);
        await moveCamera(12.55, 0.13, -0.08);
        resolve();
      }, 400);
    });
  };

  window.addEventListener("resize", handleResize);

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(
      window.innerWidth - containerPadding,
      window.innerHeight - containerPadding
    );
  }

  // function handleCanvasClick() {
  //   console.log(`${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(
  //     2
  //   )}, ${camera.position.z.toFixed(2)}
  //   ${camera.rotation.x.toFixed(2)}, ${camera.rotation.y.toFixed(
  //     2
  //   )}, ${camera.rotation.z.toFixed(2)}
  //   `);
  // }

  // canvas.addEventListener("click", handleCanvasClick);

  container.cleanup = () => {
    window.removeEventListener("resize", handleResize);
    // canvas.removeEventListener("click", handleCanvasClick);
  };

  animateMainLoop();

  return container;

  function animateMainLoop() {
    function animate() {
      requestAnimationFrame(animate);

      planetMesh.rotation.y -= 0.0002;
      planetMesh.rotation.x += 0.0005;

      if (isAnimatingTransition) {
        animateTransition();
      } else if (isSpinning) {
        rotateStars(stars.geometry, 0.01);
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }

  function startAnimateStars() {
    return new Promise((resolve) => {
      isAnimatingTransition = true;
      transitionStartTime = performance.now();
      transitionDuration = 3000;
      initialPositions = stars.geometry.attributes.position.array.slice();
      targetPositions = StarPositionGenerator.sineWave(
        initialPositions.length / 3,
        20,
        30,
        0.02,
        0.015,
        4
      );

      onTransitionComplete = () => {
        isAnimatingTransition = false;
        resolve();
      };
    });
  }

  function animateTransition() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - transitionStartTime;
    let progress = Math.min(elapsedTime / transitionDuration, 1);

    const currentPositions = stars.geometry.attributes.position.array;
    for (let i = 0; i < initialPositions.length; i++) {
      currentPositions[i] =
        initialPositions[i] +
        progress * (targetPositions[i] - initialPositions[i]);
    }

    stars.geometry.attributes.position.needsUpdate = true;

    if (progress >= 1) {
      if (onTransitionComplete) {
        onTransitionComplete();
        onTransitionComplete = null;
      }
    }
  }

  function rotateStars(geometry, angleIncrement) {
    const currentPositions = geometry.attributes.position.array;

    for (let i = 0; i < currentPositions.length; i += 3) {
      const x = currentPositions[i];
      const y = currentPositions[i + 1];
      const newX = x * Math.cos(angleIncrement) - y * Math.sin(angleIncrement);
      const newY = x * Math.sin(angleIncrement) + y * Math.cos(angleIncrement);

      currentPositions[i] = newX;
      currentPositions[i + 1] = newY;
    }

    geometry.attributes.position.needsUpdate = true;
  }

  function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "scene";
    return canvas;
  }

  function initializeScene(canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      window.innerWidth - containerPadding,
      window.innerHeight - containerPadding
    );
    camera.position.setZ(30);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const textureLoader = new THREE.TextureLoader();
    scene.background = textureLoader.load(spaceImg);

    return { scene, camera, renderer };
  }

  function createPlanet(scene) {
    const textureLoader = new THREE.TextureLoader();
    const amaraTexture = textureLoader.load(amaraImg);
    const planetGeometry = new THREE.SphereGeometry(12, 24, 24);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: amaraTexture,
    });
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planetMesh);
    return planetMesh;
  }

  function createStars(scene) {
    const numStars = 750;
    const starGeometry = new THREE.BufferGeometry();
    const glowTexture = createGlowTexture();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xfefee4,
      size: 5.5,
      map: glowTexture,
      transparent: true,
    });

    const initialPositions = StarPositionGenerator.random(numStars, 150, 520);
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(initialPositions, 3)
    );

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    return stars;
  }

  function moveCamera(x, y, z) {
    return new Promise((resolve) => {
      gsap.to(camera.position, {
        x,
        y,
        z,
        duration: 3,
        onComplete: resolve,
      });
    });
  }

  function rotateCamera(x, y, z) {
    gsap.to(camera.rotation, { x, y, z, duration: 3.2 });
  }
}
