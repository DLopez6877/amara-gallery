import styles from "./Card.module.scss";

export function Card({ name, algorithm, explanation, code, onClick }) {
  const card = document.createElement("div");
  card.className = styles.card;

  const title = document.createElement("h2");
  title.className = styles.title;
  title.textContent = name;

  const algo = document.createElement("p");
  algo.className = styles.algorithm;
  algo.innerHTML = `<strong>Algorithm:</strong> ${algorithm}`;

  const exp = document.createElement("p");
  exp.className = styles.explanation;
  exp.innerHTML = `<strong>Explanation:</strong> ${explanation}`;

  const codeBlock = document.createElement("pre");
  codeBlock.className = styles.code;
  codeBlock.textContent = code;

  const button = document.createElement("button");
  button.className = styles.viewButton;
  button.textContent = `View ${name}`;
  button.addEventListener("click", onClick);

  card.appendChild(title);
  card.appendChild(algo);
  card.appendChild(exp);
  card.appendChild(codeBlock);
  card.appendChild(button);

  return card;
}
