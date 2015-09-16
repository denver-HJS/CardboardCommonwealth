'use strict';

angular.module('cardboardCommonwealth')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm'
      });
  });
