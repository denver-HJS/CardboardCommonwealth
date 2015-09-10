(function () {
  'use strict';

  angular.module('cardboardCommonwealth', [
    'ngRoute',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ngMdIcons',
    'ngMaterial'
  ])
    .config(function ($routeProvider, $locationProvider) {

      $routeProvider
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);

    });

})();
