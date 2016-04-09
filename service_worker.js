/*Service Worker Install Event */

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('waglite_cache').then(function(cache) {
      return cache.addAll(['/assets/header/js/header.js',
        '/s.css'
        ]);
    })
  );
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

/*Service Worker Fetch Event */

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('waglite_cache').then(function(cache) {
      console.log("fetch");
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
});



