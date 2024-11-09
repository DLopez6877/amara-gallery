import { StarCanvas } from "./src/StarCanvas/StarCanvas.js";
import { EnterButton } from "./src/EnterButton.js";
import { LoadingHeader } from "./src/GalleryLoader/LoadingHeader.js";
import "./styles.scss";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const starCanvasElement = StarCanvas();
// document.querySelector("#app").prepend(starCanvasElement);

document.body.style.backgroundColor = "#898683";
const enterButton = EnterButton(() => {
  if (typeof starCanvasElement.enter === "function") {
    starCanvasElement.enter().then(() => {
      document.body.style.backgroundColor = "#898683";
      starCanvasElement.cleanup();
      starCanvasElement.remove();
    });
  }
});
document.querySelector("#app").appendChild(enterButton);
document.querySelector("#app").appendChild(LoadingHeader());
