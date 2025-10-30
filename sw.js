// AdWise Hub Service Worker - v2.0
const CACHE_NAME = 'adwise-hub-v2';
const urlsToCache = [
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/manifest.json',
  '/assets/images/placeholder.svg'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
      })
      .catch(error => {
        console.error('Cache install failed:', error);
        return Promise.resolve();
      })
  );
  self.skipWaiting();
});

// Fetch event - cache first strategy for static assets
self.addEventListener('fetch', event => {
  // Only handle same-origin requests to prevent SSRF
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(error => {
        console.error('Fetch failed:', error);
        return new Response('Offline', {status: 503, statusText: 'Service Unavailable'});
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME && cacheName.startsWith('adwise-hub-'))
          .map(cacheName => caches.delete(cacheName))
      )
    ).then(() => {
      return self.clients.claim();
    })
  );
});