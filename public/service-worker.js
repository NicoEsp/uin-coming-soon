
// UIN Service Worker for caching static assets
const CACHE_NAME = 'uin-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png', // Main UIN logo
  '/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png'  // Controller image
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }
        
        // Clone the request because it can only be consumed once
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it can only be consumed once
          const responseToCache = response.clone();
          
          // Cache the response for future use
          caches.open(CACHE_NAME)
            .then((cache) => {
              // Only cache select image assets and HTML pages
              if (
                fetchRequest.url.match(/\.(png|jpg|jpeg|webp|svg|gif)$/) ||
                fetchRequest.url.endsWith('/') ||
                fetchRequest.url.includes('index.html')
              ) {
                cache.put(event.request, responseToCache);
              }
            });
          
          return response;
        });
      })
  );
});

// Handle offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/') || caches.match('/index.html');
      })
    );
  }
});
