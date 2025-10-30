// AdWise Hub Service Worker
const CACHE_NAME = 'adwise-hub-v1.2';
const STATIC_CACHE = 'static-v1.2';
const DYNAMIC_CACHE = 'dynamic-v1.2';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/js/mobile.js',
  '/assets/js/animations.js',
  '/assets/js/chat.js',
  '/manifest.json',
  '/offline.html'
];

// Install event - cache static files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests and ads
  if (!request.url.startsWith(self.location.origin) || 
      request.url.includes('googlesyndication') ||
      request.url.includes('googletagmanager')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request)
          .then(networkResponse => {
            // Don't cache if not successful
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            
            // Clone the response
            const responseClone = networkResponse.clone();
            
            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseClone);
              });
            
            return networkResponse;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'newsletter-signup') {
    event.waitUntil(syncNewsletterSignups());
  }
});

// Push notifications
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/images/icon-192.png',
    badge: '/assets/images/badge-72.png',
    vibrate: [200, 100, 200],
    data: data.url,
    actions: [
      {
        action: 'open',
        title: 'Read Article',
        icon: '/assets/images/action-read.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/action-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});

// Helper function for syncing newsletter signups
async function syncNewsletterSignups() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('newsletter-signup')) {
        await fetch(request);
        await cache.delete(request);
      }
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }
}