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
    if (event.request.method==='GET' && requestUrl.pathname === '/sample') {
        
        
        
        event.respondWith(
      fetch(event.request).then(function(response) {
        if (!response.ok) {
          // An HTTP error response code (40x, 50x) won't cause the fetch() promise to reject.
          // We need to explicitly throw an exception to trigger the catch() clause.
          throw Error('response status ' + response.status);
        }

        // If we got back a non-error HTTP response, return it to the page.
        return response;
      }).catch(function(error) {
        console.warn('Constructing a fallback response, ' +
          'due to an error while fetching the real response:', error);

        // For demo purposes, use a pared-down, static YouTube API response as fallback.
        var fallbackResponse = {
           "msg": "mock get hello world"
        };

           var responseInit = {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'application/json',
                'X-Mock-Response': 'yes'
            }
        };
          
        // Construct the fallback response via an in-memory variable. In a real application,
        // you might use something like `return fetch(FALLBACK_URL)` instead,
        // to retrieve the fallback response via the network.
        return new Response(JSON.stringify(fallbackResponse,responseInit), {
          headers: {'Content-Type': 'application/json'}
        });
      })
    );
        
        
        
       
        
        
        
        
        
        
    }else if (event.request.method==='POST') {
         event.respondWith(
      fetch(event.request).then(function(response) {
        if (!response.ok) {
          // An HTTP error response code (40x, 50x) won't cause the fetch() promise to reject.
          // We need to explicitly throw an exception to trigger the catch() clause.
          throw Error('response status ' + response.status);
        }

        // If we got back a non-error HTTP response, return it to the page.
        return response;
      }).catch(function(error) {
        console.warn('Constructing a fallback response, ' +
          'due to an error while fetching the real response:', error);

        // For demo purposes, use a pared-down, static YouTube API response as fallback.
        var fallbackResponse = {
           "msg": "mock post hello world"
        };

           var responseInit = {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'application/json',
                'X-Mock-Response': 'yes'
            }
        };
          
        // Construct the fallback response via an in-memory variable. In a real application,
        // you might use something like `return fetch(FALLBACK_URL)` instead,
        // to retrieve the fallback response via the network.
        return new Response(JSON.stringify(fallbackResponse,responseInit), {
          headers: {'Content-Type': 'application/json'}
        });
      })
    );
    }
    else {
        event.respondWith(
            caches.open('waglite_cache').then(function(cache) {
                console.log("fetch");
                return cache.match(event.request).then(function(response) {
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