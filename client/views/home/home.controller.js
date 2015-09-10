(function() {
  'use strict';

  var controllerId = 'HomeCtrl';
  angular.module('cardboardCommonwealth')
    .controller(controllerId, HomeCtrl);

  console.log("Made it this far");
  HomeCtrl.$inject = ['$log'];
  console.log("Made it past injection");

  function HomeCtrl($log) {
    console.log("Made to constructor");
    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

    $log.info(controllerId + " set up complete.");
  }
})();
