import styles from "./EnterButton.module.scss";

export function EnterButton(onClickHandler) {
  const button = document.createElement("button");
  button.id = "enterButton";
  button.className = styles.enterButton;
  button.textContent = "← Gallery";

  button.addEventListener("click", onClickHandler);

  return button;
}
