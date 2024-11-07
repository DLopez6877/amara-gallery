# Amara Gallery

Amara Gallery is an interactive 3D visualization built using Three.js, OrbitControls, and GSAP, designed to create an immersive experience with custom animations and scene interactions. The project displays a 3D canvas containing a textured planet, glowing stars that animate in various patterns, and an animated camera that moves smoothly between predefined positions. Users can also trigger transitions, disable controls, and adjust the scene using a modular and maintainable codebase.

## Features

- **3D Scene with Three.js**: Renders a realistic space environment with a textured planet and dynamic star animations.
- **Custom Star Animations**: Includes functions to animate stars in random patterns or sine wave formations.
- **Camera Control**: Smooth camera transitions and rotations using GSAP.
- **Modular Components**: Clean, reusable functions for creating and managing scene elements, including stars and overlays.
- **User Interaction**: Control toggling and the ability to animate scenes on demand.
- **Overlay Effects**: Option to overlay and fade out the canvas with custom visual effects.

## Technologies Used

- **Three.js**: A popular JavaScript 3D library for rendering scenes.
- **GSAP (GreenSock Animation Platform)**: For smooth animations and camera transitions.
- **OrbitControls**: For interactive camera controls.
- **Modular Code Structure**: Easy-to-read and maintain codebase with separated functionalities.

## Decision to Use Vanilla JavaScript

This project was implemented using vanilla JavaScript instead of a framework (e.g., React or Vue) to maintain a lightweight and framework-agnostic codebase. This decision allows for better control over the project and simplifies integration into any environment, including static sites and other applications. Despite using vanilla JavaScript, a modular component style was adopted to provide structure and scalability akin to modern frameworks. Each major functionality, such as the star generation, camera animations, and overlay management, was encapsulated in its own module for easy reuse and maintenance.

## How to Use

- **Main Entry**: The project starts in `main.js` by appending a `StarCanvas` instance to the app container.
- **Animations**: The `StarCanvas` includes functions such as `container.enter()` to animate star transitions and move the camera to specific points.
- **Camera Controls**: While the `OrbitControls` are enabled by default, they can be disabled programmatically using `controls.enabled = false`.
- **Customization**:
  - You can limit how far the camera can move by setting `controls.minDistance` and `controls.maxDistance`.
  - Right-click controls can be disabled directly within the `OrbitControls` configuration.

## Example Code

### Initializing StarCanvas in `main.js`

```javascript
import { StarCanvas } from "./src/StarCanvas/StarCanvas.js";

const starCanvasElement = StarCanvas();
document.querySelector("#app").appendChild(starCanvasElement);

starCanvasElement.enter(3000).then(() => {
  starCanvasElement.cleanup();
  starCanvasElement.remove();
});
```

### Enabling Star Animations

```javascript
starCanvasElement.animateStars(3000);
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit issues and pull requests for improvements or bug fixes.

## Contact

For more information or support, contact [bril.dev@outlook.com](mailto:bril.dev@outlook.com).
