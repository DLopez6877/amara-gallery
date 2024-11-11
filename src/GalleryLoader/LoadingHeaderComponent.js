import styles from "./GalleryLoader.module.scss";

export function LoadingHeaderComponent({ svgContent, className }) {
  const loadingHeader = document.createElement("div");
  loadingHeader.innerHTML = svgContent;
  loadingHeader.className = styles[className] || className;
  return loadingHeader;
}
