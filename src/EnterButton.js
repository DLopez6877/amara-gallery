import styles from "../styles/EnterButton.module.scss";

export function EnterButton(onClickHandler) {
  const button = document.createElement("button");
  button.id = "enterButton";
  button.className = styles.enterButton;
  button.textContent = "Enter";

  button.addEventListener("click", onClickHandler);

  return button;
}
