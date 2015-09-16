(function() {
  'use strict';

  var controllerId = 'AboutCtrl';
  angular.module('cardboardCommonwealth')
    .controller(controllerId, AboutCtrl);

  AboutCtrl.$inject = ['$log','$mdSidenav'];

  function AboutCtrl($log, $mdSidenav) {
    var vm = this;

    angular.extend(vm, {
      name: 'AboutCtrl'
    });

    vm.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $log.info(controllerId + " set up complete.");
  }
})();
