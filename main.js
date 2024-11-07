import { StarCanvas } from "./src/StarCanvas/StarCanvas.js";
import { EnterButton } from "./src/EnterButton.js";
import "./styles.scss";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const starCanvasElement = StarCanvas();
document.querySelector("#app").prepend(starCanvasElement);

const enterButton = EnterButton(() => {
  if (typeof starCanvasElement.enter === "function") {
    starCanvasElement.enter().then(() => {
      starCanvasElement.cleanup();
      starCanvasElement.remove();
    });
  }
});
document.querySelector("#app").appendChild(enterButton);
