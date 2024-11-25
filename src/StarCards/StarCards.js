import styles from "./StarCards.module.scss";

export function StarCards(positions, appElement, starCanvasElement) {
  const container = document.createElement("div");
  container.className = styles.cardsContainer;

  let activeCard = null;
  let minimized = false;

  const minimizeButton = document.createElement("button");
  minimizeButton.className = styles.minimizeButton;
  minimizeButton.textContent = "–";
  minimizeButton.addEventListener("click", () => {
    container.classList.add(styles.hidden);
    minimizeButton.classList.add(styles.hidden);
    maximizeButton.classList.remove(styles.hidden);
    minimized = true;
  });

  const maximizeButton = document.createElement("button");
  maximizeButton.className = `${styles.maximizeButton} ${styles.hidden}`;
  maximizeButton.textContent = "+";
  maximizeButton.addEventListener("click", () => {
    container.classList.remove(styles.hidden);
    maximizeButton.classList.add(styles.hidden);
    minimizeButton.classList.remove(styles.hidden);
    minimized = false;
  });

  appElement.appendChild(maximizeButton);

  positions.forEach((position) => {
    const card = document.createElement("div");
    card.className = `${styles.card} ${styles.hidden}`;
    card.dataset.method = position.method;

    const title = document.createElement("h2");
    title.textContent = position.name;

    const algorithm = document.createElement("p");
    algorithm.innerHTML = `<strong>Algorithm:</strong> ${position.algorithm}`;

    const explanation = document.createElement("p");
    explanation.innerHTML = `<strong>Explanation:</strong> ${position.explanation}`;

    const code = document.createElement("pre");
    code.textContent = position.code;

    card.appendChild(minimizeButton.cloneNode(true));
    card.appendChild(title);
    card.appendChild(algorithm);
    card.appendChild(explanation);
    card.appendChild(code);
    container.appendChild(card);
  });

  appElement.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button || !button.dataset.method) return;

    const method = button.dataset.method;

    if (activeCard) {
      activeCard.classList.add(styles.hidden);
    }

    activeCard = container.querySelector(`[data-method="${method}"]`);
    if (activeCard) {
      activeCard.classList.remove(styles.hidden);
    }
  });

  return container;
}
