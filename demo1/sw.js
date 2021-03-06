var cacheName = 'hello-pwa';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
          .then(cache => cache.addAll(
            [
                '/',
                './images/logo.jpg',
                './index.html',
                './css/style.css'
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

  self.addEventListener('activate', function(e) {
    e.waitUntil(
      Promise.all(
        caches.keys().then(cacheNames => {
          return cacheNames.map(name => {
            if (name !== cacheName) {
              return caches.delete(name)
            }
          })
        })
      ).then(() => {
        return self.clients.claim()
      })
    )
  })