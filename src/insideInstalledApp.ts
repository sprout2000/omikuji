export const insideInstalledApp = (): boolean =>
  window.matchMedia('(display-mode: standalone)').matches ||
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.navigator.standalone === true;
