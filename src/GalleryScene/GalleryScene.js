import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { disposeModel } from "../Helpers.js";
import styles from "./GalleryScene.module.scss";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export function GalleryScene({ cameraPositions }) {
  const container = document.createElement("div");
  container.className = styles.gallerySceneContainer;

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  canvas.className = styles.sceneCanvas;

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const controls = new OrbitControls(camera, renderer.domElement);
  let model;

  let positionIndex = 0;
  let loading = true;

  init();

  function init() {
    setupRenderer();
    setupScene();
    setupCamera();
    loadModel();
    setupEventListeners();

    animate();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    container.cleanup = () => {
      cleanup(resizeObserver);
    };
  }

  function setupRenderer() {
    const dpr = window.devicePixelRatio || 1;
    renderer.setPixelRatio(Math.min(dpr, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xe2e4d0);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
  }

  function setupScene() {
    scene.background = new THREE.Color(0x898683);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1000);
    pointLight.position.set(5, 30, -20);
    scene.add(pointLight);
    // const PointLightHelper = new THREE.PointLightHelper(pointLight);
    // scene.add(PointLightHelper);
    // console.log(pointLight.position);
  }

  function setupCamera() {
    if (!cameraPositions) {
      camera.position.set(17.89, 8.81, -15.75);
      camera.rotation.set(-1.58, 1.0, 1.58);
      moveCamera(-7.31, 7.16, -25.7);
      rotateCamera(-1.73, -1.54, -1.73);
      controls.enableDamping = true;
      controls.dampingFactor = 0.5;
      controls.enableZoom = true;
      controls.update();
    } else {
      const { posX, posY, posZ, rotateX, rotateY, rotateZ } =
        cameraPositions[cameraPositions.length - 1];
      camera.position.set(posX, posY, posZ);
      camera.rotation.set(rotateX, rotateY, rotateZ);
    }
  }

  function loadModel() {
    const gltfLoader = new GLTFLoader();
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath(
    //   "https://www.gstatic.com/draco/versioned/decoders/1.4.3/"
    // );
    // gltfLoader.setDRACOLoader(dracoLoader);
    // THREE.Cache.enabled = true;

    gltfLoader.load(
      "/godfrey_gallery/scene.gltf",
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
        loading = false;
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
        loading = false;
      }
    );
  }

  function handleResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function setupEventListeners() {
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseUp(event) {
    if (!container.contains(event.target)) return;

    if (!cameraPositions) {
      const logX = camera.position.x.toFixed(2);
      const logY = camera.position.y.toFixed(2);
      const logZ = camera.position.z.toFixed(2);
      console.log(`
        camera.position.set(${logX}, ${logY}, ${logZ});
        camera.rotation.set(${logX}, ${logY}, ${logZ});
      `);
    } else {
      const { posX, posY, posZ, rotateX, rotateY, rotateZ } =
        cameraPositions[positionIndex];
      moveCamera(posX, posY, posZ);
      rotateCamera(rotateX, rotateY, rotateZ);
      positionIndex = (positionIndex + 1) % cameraPositions.length;
    }
  }

  function moveCamera(x, y, z) {
    gsap.to(camera.position, { x, y, z, duration: 3 });
  }

  function rotateCamera(x, y, z) {
    gsap.to(camera.rotation, { x, y, z, duration: 3.2 });
  }

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function cleanup(resizeObserver) {
    window.removeEventListener("mouseup", handleMouseUp);
    if (model) {
      disposeModel(model);
      scene.remove(model);
    }
    controls.dispose();
    renderer.setAnimationLoop(null);
    renderer.dispose();
    resizeObserver.disconnect();
  }

  return container;
}
