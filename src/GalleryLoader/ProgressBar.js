import styles from "./GalleryLoader.module.scss";

export function ProgressBar(durationMS) {
  const progressBarContainer = document.createElement("div");
  progressBarContainer.className = styles.progressBarContainer;

  const progressBar = document.createElement("div");
  progressBar.className = styles.progressBar;
  progressBarContainer.appendChild(progressBar);

  const progressText = document.createElement("span");
  progressText.className = styles.progressText;
  progressBarContainer.appendChild(progressText);

  let progress = 0;
  const duration = durationMS;
  const interval = 100;

  const increment = (100 / durationMS) * interval; // Calculate progress increment per interval

  const progressInterval = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
    }
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.floor(progress)}%`;
  }, interval);

  return progressBarContainer;
}
