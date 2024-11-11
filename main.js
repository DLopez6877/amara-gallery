import { StarCanvas } from "./src/StarCanvas/StarCanvas.js";
import { EnterButton } from "./src/EnterButton/EnterButton.js";
import { GalleryLoader } from "./src/GalleryLoader/GalleryLoader.js";
import { GalleryScene } from "./src/GalleryScene/GalleryScene.js";
import "./main.scss";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);
const starCanvasElement = StarCanvas();
const galleryPositions = GalleryScene({
  // cameraPositions: [
  //   { posX: 0, posY: 5, posZ: 15, rotateX: 0, rotateY: 0, rotateZ: 0 },
  //   {
  //     posX: 10,
  //     posY: 5,
  //     posZ: 10,
  //     rotateX: 0,
  //     rotateY: Math.PI / 4,
  //     rotateZ: 0,
  //   },
  //   // Add more camera positions as needed
  // ],
});

const enterButton = EnterButton(() => {
  if (typeof starCanvasElement.enter === "function") {
    starCanvasElement.enter().then(() => {
      document
        .querySelector("#app")
        .appendChild(GalleryScene(galleryPositions));
      starCanvasElement.cleanup();
      starCanvasElement.remove();
    });
  }
});

// document.querySelector("#app").prepend(starCanvasElement);
document.querySelector("#app").appendChild(GalleryLoader());
// document.querySelector("#app").appendChild(enterButton);
