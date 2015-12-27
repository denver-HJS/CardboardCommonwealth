(function () {
  'use strict';

  //const angular = require('angular');

  var _ = require('lodash');
  require('angular-material');
  require('angular-ui-router');
  require('angular-messages');
  require('angular-animate');
  require('angular-aria');
  require('angular-resource');
  require('angular-sanitize');
  require('angular-material-icons');
  require('babel-core/external-helpers.js');
  require('slipjs');
  require('angular-slip');
  require('jquery-sticky');
  require('./config/ngConstants.js');



  const ngModule = angular.module('ccApp', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngResource', 'ngSanitize',
      'ngMessages', 'ngAria', 'slip', 'ccApp.constants']);

  ngModule
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $logProvider,
      $httpProvider, $mdThemingProvider) {
        $locationProvider.html5Mode(true);
        $logProvider.debugEnabled(true); //false to prevent _$log.debug output
        $httpProvider.defaults.useXDomain = true;

        /* BEGIN COLOR THEMES */
        $mdThemingProvider.theme('default')
          .primaryPalette('amber')
          .accentPalette('light-blue')
          .backgroundPalette('grey', {
              'default': '200'
          });
        /* END COLOR THEMES */

        /* BEGIN UI ROUTER STATES */
        // For any unmatched url, redirect to the home page
        $urlRouterProvider.otherwise("home");
        // Now set up the states
        $stateProvider
          .state('home', {
            url: '/',
            views: {
              '': {
                templateUrl: 'partials/home/index.html',
                controller: 'homeController as vm'
              },
              'navbar': {
                templateUrl: 'partials/nav/index.html',
                controller: 'sideNavController as nav'
              }
            },
            data: {
                toolbarClass: "home",
                rootState: true
            }
          })
          .state('aboutus', {
            url: '/aboutus',
            views: {
              '': {
                templateUrl: 'partials/aboutus/index.html',
                controller: 'aboutUsController as vm'
              },
              'navbar': {
                templateUrl: 'partials/nav/index.html',
                controller: 'sideNavController as nav'
              }
            },
            data: {
                toolbarClass: "aboutus",
                rootState: true
            }
          })
          .state('artists', {
            url: '/artists',
            views: {
              '': {
                templateUrl: 'partials/artists/index.html',
                controller: 'artistsController as vm'
              },
              'navbar': {
                templateUrl: 'partials/nav/index.html',
                controller: 'sideNavController as nav'
              }
            },
            data: {
                toolbarClass: "artists",
                rootState: true
            }
          })
          .state('artists.details', {
            url: '/:id',
            views: {
              '': {
                templateUrl: 'partials/artists/details.html',
                controller: 'artistDtlsController as vm'
              },
              'navbar': {
                templateUrl: 'partials/nav/index.html',
                controller: 'sideNavController as nav'
              }
            },
            data: {
                toolbarClass: "artists",
                rootState: true
            }
          });
        /* END UI ROUTER STATES */
    });

    ngModule.run( ($log, $rootScope, $mdDialog, $mdToast, $window, $state, $resource, $q, ccUtils, userService,
                   persistenceService, navigationService) => {
      $log.debug("Running angular module ngModule");

      $rootScope.$on('$stateChangeStart', (event,toState,toParams,fromState,fromParams) => {
        if(navigationService._pushOrPop && navigationService._pushOrPop=='POP'){
          console.log(navigationService._stateStack);
          navigationService._pushOrPop='';
        } else{
          navigationService.pushState(toState.name);
        }
      });
      // end listeners


      /**
       * Displays a toast message to the user in the lower right corner of the screen
       * @param msg The message to be displayed
       * @param duration The length of time in seconds that the message will display
       */
      $rootScope.toast = (msg, duration) => {
        var _duration = 3000;
        if(duration) {
          _duration = duration * 1000;
        }
        $mdToast.show(
          $mdToast.simple()
            .content(msg)
            .position("bottom right")
            .hideDelay(_duration)
        );
      };
    });

    ngModule.filter('trustedUrl', function ($sce) {
      return function(url) {
        return $sce.trustAsResourceUrl(url);
      };
    });

    require('./components/header')(ngModule);
    require('./components/customValidation')(ngModule);
    require('./components/contentTile')(ngModule);
    require('./components/shared/ccUtils')(ngModule);
    require('./components/shared/user')(ngModule);
    require('./partials/home')(ngModule);
    require('./partials/aboutUs')(ngModule);
    require('./partials/artists')(ngModule);
    require('./partials/nav')(ngModule);
    require('./partials/dialogs')(ngModule);

})();
