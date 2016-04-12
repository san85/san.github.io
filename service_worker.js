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
        
        
        var responseBody = {
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

        var mockResponse = new Response(JSON.stringify(responseBody), responseInit);
        console.log(' Responding with a mock response body:', responseBody);
        
        event.respondWith(
                    var fetchPromise = fetch(event.request).then(function(response) {
                        
                        return response;
                    });
                 return mockResponse || response;
        );
        
        
        
        
        
        
    }else if (event.request.method==='POST') {
        var responseBody = {
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

        var mockResponse = new Response(JSON.stringify(responseBody), responseInit);
        console.log(' Responding with a mock response body:', responseBody);
        
        event.respondWith(          
                     var fetchPromise = fetch(event.request).then(function(response) {
                        
                        return response;
                    });
                 return response || mockResponse;
                
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