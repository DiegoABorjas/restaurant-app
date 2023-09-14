import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
    // register workbox service worker
    const workboxSW = new Workbox('/src-sw.js');
    workboxSW.register();
  } else {
    console.error('Service workers are not supported in this browser.');
  }