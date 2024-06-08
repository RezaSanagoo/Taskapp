self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/service-worker.js',
        '/icon.png',
        '/icon-512.png',
        '/assets/Alibaba-Black-Dfs8V5H0.woff2',
        '/assets/Alibaba-Bold-BjMJTvpu.woff2',
        '/assets/Alibaba-Light-DYVxATv1.woff2',
        '/assets/Alibaba-Regular-CbtUYRy0.woff2',
        '/assets/index-BqHST1BT.css',
        '/assets/index-tlu3060W.js',
        '/fav.ico',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'my-cache') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
