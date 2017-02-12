/*Service Worker Install Event */
var cacheversion='mmslite_cache';
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheversion).then(function(cache) {
            return cache.addAll(['/index.html']);
        })
    );
    console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return !cacheName.startsWith('test');
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
    if (event.request.method === 'GET' && requestUrl.pathname === '/sample') {



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
                return new Response(JSON.stringify(fallbackResponse, responseInit), {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );










    } else if (event.request.method === 'POST') {
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
                return new Response(JSON.stringify(fallbackResponse, responseInit), {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );
    } else {
        event.respondWith(
            caches.open('mmslite_cache').then(function(cache) {
                console.log("fetch");
                return cache.match(event.request).then(function(response) {
                    return response || fetch(event.request).then(fetchedFromNetwork,unableToResolve ).catch(unableToResolve);
                    
                    function fetchedFromNetwork(response) {
          /* We copy the response before replying to the network request.
             This is the response that will be stored on the ServiceWorker cache.
          */
          var cacheCopy = response.clone();

          console.log('WORKER: fetch response from network.', event.request.url);

          caches
            // We open a cache to store the response for this request.
            .open(cacheversion)
            .then(function add(cache) {
              /* We store the response for this request. It'll later become
                 available to caches.match(event.request) calls, when looking
                 for cached responses.
              */
              cache.put(event.request, cacheCopy);
            })
            .then(function() {
              console.log('WORKER: fetch response stored in cache.', event.request.url);
            });

          // Return the response so that the promise is settled in fulfillment.
          return response;
        }

        /* When this method is called, it means we were unable to produce a response
           from either the cache or the network. This is our opportunity to produce
           a meaningful response even when all else fails. It's the last chance, so
           you probably want to display a "Service Unavailable" view or a generic
           error response.
        */
        function unableToResolve () {
          /* There's a couple of things we can do here.
             - Test the Accept header and then return one of the `offlineFundamentals`
               e.g: `return caches.match('/some/cached/image.png')`
             - You should also consider the origin. It's easier to decide what
               "unavailable" means for requests against your origins than for requests
               against a third party, such as an ad provider
             - Generate a Response programmaticaly, as shown below, and return that
          */

          console.log('WORKER: fetch request failed in both cache and network.');

          /* Here we're creating a response programmatically. The first parameter is the
             response body, and the second one defines the options for the response.
          */
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
                    
                }).catch(function() {
                    return caches.match("/fallback.html");
                });
            })
        );
    }
});

self.addEventListener('push', function(event) {
  console.log('Push message', event);

  var title = 'Push message';

  event.waitUntil(
    self.registration.showNotification(title, {
      'body': 'New MMS Store',
      'icon': 'img/img-256.png'
    }));
});


/*self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag', event.notification.tag);
  // Android doesn't close the notification when you click it
  // See http://crbug.com/463146
  event.notification.close();

  var url = 'https://youtu.be/gYMkEMCHtJ4';
  // Check if there's already a tab open with this URL.
  // If yes: focus on the tab.
  // If no: open a tab with the URL.
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      console.log('WindowClients', windowClients);
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log('WindowClient', client);
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});*/


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