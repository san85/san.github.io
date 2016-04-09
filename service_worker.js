/*Service Worker Install Event */

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('waglite_cache').then(function(cache) {
      return cache.addAll(['/']);
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
    
    console.log('Handling fetch event for', event.request.url);
    console.log(event);
  var requestUrl = new URL(event.request.url);
    console.log(requestUrl.pathname);
    if (requestUrl.pathname === '/sample') {
    // This matches the result format documented at
    // https://developers.google.com/url-shortener/v1/getting_started#shorten
    var responseBody = {
	"msg":"mock hello world"
};

    var responseInit = {
      // status/statusText default to 200/OK, but we're explicitly setting them here.
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
        // Purely optional, but we return a custom response header indicating that this is a
        // mock response. The controlled page could check for this header if it wanted to.
        'X-Mock-Response': 'yes'
      }
    };

    var mockResponse = new Response(JSON.stringify(responseBody), responseInit);

    console.log(' Responding with a mock response body:', responseBody);
    event.respondWith(mockResponse);
  }else{event.respondWith(
    caches.open('waglite_cache').then(function(cache) {
      console.log("fetch");
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(function() {
      return caches.match("/fallback.html");
    });
    })
  );
      }
});


/*self.addEventListener('fetch', function(event) {
    
    
    
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
});*/



