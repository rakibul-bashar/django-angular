(function () {
  'use strict';

  angular
    .module('djangular', [
      'djangular.config',
      'djangular.routes',
      'djangular.authentication'
    ]);
  angular
    .module('djangular.config', []);
  angular
    .module('djangular.routes', ['ngRoute']);
   angular
    .module('djangular')
    .run(run);
   run.$inject=['$http'];
   function run($http) {
       $http.defaults.xsrfHeaderName='X-CSRFToken';
       $http.defaults.xsrfCookieName='csrftoken';
   }




})();
