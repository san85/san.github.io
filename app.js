
/* Service Worker Register */

var reg;
var swFileName = "service_worker.js";
var serviceWorkerURL = "/" + swFileName;
var scope = "/";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(serviceWorkerURL, { scope: scope }).then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(Registration) {
    reg = Registration;
      
       reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
      console.log('endpoint:', sub.endpoint);
    });
      
    console.log('Service Worker is ready :', reg);
  }).catch(function(error) {
    console.log('Service Worker Error :', error);
  });
    
   
}
 window.addEventListener('beforeinstallprompt', function(e) {
    
   //     outputElement.textContent = 'beforeinstallprompt Event fired';
      });

/*function subscribe() {
  // Disable the button so it can't be changed while
  //   we process the permission request
  var pushButton = document.querySelector('.js-push-button');
  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
      .then(function(subscription) {
        // The subscription was successful
        isPushEnabled = true;
        pushButton.textContent = 'Disable Push Messages';
        pushButton.disabled = false;

        // TODO: Send the subscription subscription.endpoint
        // to your server and save it to send a push message
        // at a later date
        return sendSubscriptionToServer(subscription);
      })
      .catch(function(e) {
        if (Notification.permission === 'denied') {
          // The user denied the notification permission which
          // means we failed to subscribe and the user will need
          // to manually change the notification permission to
          // subscribe to push messages
          window.Demo.debug.log('Permission for Notifications was denied');
          pushButton.disabled = true;
        } else {
          // A problem occurred with the subscription, this can
          // often be down to an issue or lack of the gcm_sender_id
          // and / or gcm_user_visible_only
          window.Demo.debug.log('Unable to subscribe to push.', e);
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages';
        }
    });
  });
}

function unsubscribe() {  
  var pushButton = document.querySelector('.js-push-button');  
  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
    // To unsubscribe from push messaging, you need get the  
    // subscription object, which you can call unsubscribe() on.  
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(pushSubscription) {  
        // Check we have a subscription to unsubscribe  
        if (!pushSubscription) {  
          // No subscription object, so set the state  
          // to allow the user to subscribe to push  
          isPushEnabled = false;  
          pushButton.disabled = false;  
          pushButton.textContent = 'Enable Push Messages';  
          return;  
        }  

        // TODO: Make a request to your server to remove
        // the users data from your data store so you
        // don't attempt to send them push messages anymore

        // We have a subscription, so call unsubscribe on it  
        pushSubscription.unsubscribe()
          .then(function(successful) {  
            pushButton.disabled = false;  
            pushButton.textContent = 'Enable Push Messages';  
            isPushEnabled = false;  
          }).catch(function(e) {  
            // We failed to unsubscribe, this can lead to  
            // an unusual state, so may be best to remove   
            // the users data from your data store and   
            // inform the user that you have done so

            console.log('Unsubscription error: ', e);  
            pushButton.disabled = false;
            pushButton.textContent = 'Enable Push Messages'; 
          });  
      }).catch(function(e) {  
        console.error('Error thrown while unsubscribing from push messaging.', e);  
      });  
  });  
}*/