
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
    console.log('Service Worker is ready :', reg);
  }).catch(function(error) {
    console.log('Service Worker Error :', error);
  });
}
