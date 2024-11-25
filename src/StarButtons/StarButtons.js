import styles from "./StarButtons.module.scss";

export function StarButtons(positions, starCanvasElement) {
  const container = document.createElement("div");
  container.className = styles.starButtonsContainer;

  positions.forEach((position) => {
    const button = document.createElement("button");
    button.className = styles.starButton;
    button.dataset.method = position.method;
    button.textContent = position.name;

    button.addEventListener("click", () => {
      starCanvasElement[position.method](...position.args);
    });

    container.appendChild(button);
  });

  return container;
}
