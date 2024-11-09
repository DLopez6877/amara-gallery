export function ImageComponent({ src, alt, className }) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.className = className;
  return image;
}
