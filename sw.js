const CACHE_NAME = 'archery-3d-cache-v1';
const urlsToCache = [
  './index.html',
  './three.min.js',
  './cannon.min.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install the service worker and cache the game assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});