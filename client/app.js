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
    .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

      $routeProvider
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);

    })
    .config(function ($mdThemingProvider) {
      var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
      });
      $mdThemingProvider.definePalette('customBlue', customBlueMap);
      $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
          'default': '500',
          'hue-1': '50'
        })
        .accentPalette('pink');
      $mdThemingProvider.theme('input', 'default')
          .primaryPalette('grey');
    });

})();
