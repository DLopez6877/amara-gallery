export function LoadingHeaderComponent({ svgContent, className }) {
  const loadingHeader = document.createElement("div");
  loadingHeader.innerHTML = svgContent;
  loadingHeader.className = className;
  return loadingHeader;
}
