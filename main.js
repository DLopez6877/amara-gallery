import { StarCanvas } from "./src/StarCanvas/StarCanvas.js";
import { EnterButton } from "./src/EnterButton/EnterButton.js";
import { GalleryLoader } from "./src/GalleryLoader/GalleryLoader.js";
import { StarButtons } from "./src/StarButtons/StarButtons.js";
import "./main.scss";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import starPositions from "./starPositions.js";

gsap.registerPlugin(Draggable);

const starCanvasElement = StarCanvas();
document.querySelector("#app").prepend(starCanvasElement);
const starButtons = StarButtons(starPositions, starCanvasElement);
document.querySelector("#app").appendChild(starButtons);

const enterButton = EnterButton(() => {
  if (typeof starCanvasElement.enter === "function") {
    enterButton.style.opacity = "0";
    starButtons.style.opacity = "0";
    enterButton.style.pointerEvents = "none";
    starButtons.style.pointerEvents = "none";
    starCanvasElement.enter().then(() => {
      document.querySelector("#app");
      document.querySelector("#app").appendChild(GalleryLoader());
      starCanvasElement.cleanup();
      starCanvasElement.remove();
    });
  }
});
document.querySelector("#app").appendChild(enterButton);
