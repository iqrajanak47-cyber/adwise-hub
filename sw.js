// Service Worker for caching and performance
const CACHE_NAME = 'advise-hub-v1';
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/posts.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/js/lazy-load.js',
  '/assets/images/placeholder.svg'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Cache first strategy
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    // Images: Cache first
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  } else if (event.request.destination === 'script' || event.request.destination === 'style') {
    // CSS/JS: Stale while revalidate
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          const fetchPromise = fetch(event.request)
            .then(fetchResponse => {
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, fetchResponse.clone()));
              return fetchResponse;
            });
          return response || fetchPromise;
        })
    );
  } else {
    // HTML: Network first
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
  }
});