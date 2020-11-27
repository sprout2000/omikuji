export const forceScreenSize = (width: number, height: number): void => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    window.resizeTo(width, height);
  }
};
