import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import spaceImg from "/space.png";
import amaraImg from "/amara.jpg";
import { createGlowTexture } from "./createGlowTexture.js";
import StarPositionGenerator from "./StarPositionGenerator.js";
import gsap from "gsap";
import { delay } from "../Helpers.js";
import vars from "../../vars.js";

export function StarCanvas() {
  const container = document.createElement("div");
  const canvas = document.createElement("canvas");
  canvas.style.border = "8px solid white";
  canvas.style.position = "fixed";
  container.appendChild(canvas);

  const { scene, camera, renderer } = initializeScene(canvas);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.mouseButtons.RIGHT = null;
  controls.minDistance = 20;
  controls.maxDistance = 650;
  const planetMesh = createPlanet(scene);
  const stars = createStars(scene);

  let isAnimatingTransition = false;
  let transitionStartTime = 0;
  let transitionDuration = 0;
  let initialPositions = [];
  let targetPositions = [];
  let onTransitionComplete = null;

  const animateToPosition = (generatorFunction, ...args) => {
    return new Promise((resolve) => {
      isAnimatingTransition = true;
      transitionStartTime = performance.now();
      transitionDuration = 3000;
      initialPositions = stars.geometry.attributes.position.array.slice();
      targetPositions = generatorFunction(initialPositions.length / 3, ...args);

      onTransitionComplete = () => {
        isAnimatingTransition = false;
        resolve();
      };
    });
  };

  for (const [key, func] of Object.entries(StarPositionGenerator)) {
    container[key] = (...args) => animateToPosition(func, ...args);
  }

  container.enter = async function () {
    return new Promise(async (resolve) => {
      controls.minDistance = 0;
      controls.enabled = false;
      await moveCamera(0, 0, 420);
      await container.sineWave(20, 30, 0.02, 0.015, 4);

      rotateCamera(-2.08, 1.53, 2.08);
      await moveCamera(759.75, 7.74, -4.67);
      await moveCamera(12.55, 0.13, 5);
      canvas.style.transition = "opacity 0.5s ease-out";
      canvas.style.opacity = 0;
      await delay(1000);
      resolve();
    });
  };

  window.addEventListener("resize", handleResize);

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  container.cleanup = () => {
    window.removeEventListener("resize", handleResize);
  };

  animateMainLoop();

  return container;

  function animateMainLoop() {
    function animate() {
      requestAnimationFrame(animate);
      planetMesh.rotation.y -= 0.0004;
      planetMesh.rotation.x += 0.0006;

      if (isAnimatingTransition) {
        animateTransition();
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(200);

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
    const numStars = vars.NUMBER_OF_STARS;
    const starGeometry = new THREE.BufferGeometry();
    const glowTexture = createGlowTexture();

    const starMaterial = new THREE.PointsMaterial({
      color: 0xfefee4,
      size: 5.5,
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
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
