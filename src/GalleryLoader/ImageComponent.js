import styles from "./GalleryLoader.module.scss";

export function ImageComponent({ src, alt, className }) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.className = styles[className] || className;
  return image;
}
