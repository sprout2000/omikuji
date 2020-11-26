import { insideInstalledApp } from './insideInstalledApp';

export const forceScreeSize = (width: number, height: number): void => {
  if (insideInstalledApp()) {
    window.addEventListener('resize', () => {
      window.resizeTo(width, height);
    });
  }
};
