var cacheName = 'hello-pwa';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
          .then(cache => cache.addAll(
            [
                '/images/logo.jpg'
            ]
          )).then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', function (event) {  
    event.respondWith(
      caches.match(event.request)                    
      .then(function (response) {
        if (response) {                              
          return response;                           
        }
        return fetch(event.request);                 
      })
    );
  });