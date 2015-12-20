(function () {
  'use strict';

  //const angular = require('angular');

  var _ = require('lodash');
  require('angular-material');
  require('angular-ui-router');
  require('angular-touch');
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



  const ngModule = angular.module('ccApp', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngResource', 'ngTouch', 'ngSanitize',
      'ngMessages', 'ngAria', 'slip', 'ccApp.constants']);

  ngModule
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $logProvider,$httpProvider) {
        $locationProvider.html5Mode(true);
        $logProvider.debugEnabled(true); //false to prevent _$log.debug output
        $httpProvider.defaults.useXDomain = true;

        //
        // For any unmatched url, redirect to /inspection
        $urlRouterProvider.otherwise("home");
        // Now set up the states
        $stateProvider
          .state('home', {
            url: '/',
            views: {
              '': {
                templateUrl: 'partials/home/index.html',
                controller: 'homeController as vm'
              }
            },
            data: {
                toolbarClass: "inspect",
                rootState: true
            }
          });
    });

    ngModule.run( ($log, $rootScope, $mdDialog, $mdToast, $window, $state, $resource, $q, igUtils, userService,
                   persistenceService, navigationService) => {
      $log.debug("Running angular module ngModule");

      $rootScope.$on('$stateChangeStart', (event,toState,toParams,fromState,fromParams) => {
        if(navigationService._pushOrPop && navigationService._pushOrPop=='POP'){
          console.log(navigationService._stateStack);
          navigationService._pushOrPop='';
        }else{
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

      $rootScope.close = function(event) {
        $log.info("Closing application");
        if (igUtils.isExternalFunc('closeApplication')) {
          container.closeApplication();
        }
        //$window.external.CloseApplication();
      };
    }

    ngModule.filter('trustedUrl', function ($sce) {
      return function(url) {
        return $sce.trustAsResourceUrl(url);
      };
    });

    require('./components/header')(ngModule);
    require('./components/customValidation')(ngModule);
    require('./components/shared/camera')(ngModule);
    require('./components/shared/igUtils')(ngModule);
    require('./components/shared/inspection')(ngModule);
    require('./components/shared/user')(ngModule);
    require('./partials/shipmentDetails')(ngModule);
    require('./partials/inspectionList')(ngModule);
    require('./partials/viewPhoto')(ngModule);
    require('./partials/nav')(ngModule);
    require('./partials/dialogs')(ngModule);

})();
