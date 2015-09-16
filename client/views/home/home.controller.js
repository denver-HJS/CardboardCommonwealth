(function() {
  'use strict';

  var controllerId = 'HomeCtrl';
  angular.module('cardboardCommonwealth')
    .controller(controllerId, HomeCtrl);

  HomeCtrl.$inject = ['$log','$mdSidenav'];

  function HomeCtrl($log, $mdSidenav) {
    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

    vm.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $log.info(controllerId + " set up complete.");
  }
})();
