(function () {
  'use strict';

  angular
    .module('djangular.authentication', [
      'djangular.authentication.controllers',
      'djangular.authentication.services'
    ]);

  angular
    .module('djangular.authentication.controllers', []);

  angular
    .module('djangular.authentication.services', ['ngCookies']);
})();
