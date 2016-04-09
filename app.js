/** (c) Walgreen Co. All rights reserved.**/
/**
 * Vaccine availability overlay Developer: Bala Subramanian.M Date:16/06/2014
 */
/*'use strict';
Clazz.createPackage('com.wag.app.js');
Clazz.com.wag.app.js.VaccineHiddenImm = Clazz
.extend(
Clazz.Widget,
{

initialize : function() {
//this.myContainer = "wagVaccineAvailabilityOverlay";
this.controller = Clazz.com.wag.app.js.RootAppController;
},

injectDependencies : function() {
this.controller.RootAppController.$inject = [
'$scope', '$rootScope', 'ngRoute',
'$location' ];

}
});


Clazz.com.wag.app.js.RootAppController = {
RootAppController : function($scope, $rootScope,
$routeProvider, $location) {

};
}
};


'use strict';
(function() {
  'use strict';
    angular.module('wagAppRoutes', ['ngRoute'])
        .config(function ($routeProvider) {
   
         
         $routeProvider.when('/find', {
                templateUrl: 'storelocator/find.html'
            })
            .when('/storedetails/:storenumber', {
                templateUrl: 'storelocator/storedetails.html'
            })
             .otherwise({
        redirectTo: '/find'
      });

        })
       
        .run(['$location', WAGPAppRun]);

    function WAGPAppRun($location) {
      
    }
})();


*/
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
