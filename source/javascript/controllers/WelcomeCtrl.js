(function() {
  'use strict';

  angular
      .module('cbCommApp')
      .controller('WelcomeController', WelcomeController);

  /* If dependencies are required - use the $inject option */
  WelcomeController.$inject = ['$scope'];


  function WelcomeController($scope) {
    /*jshint validthis: true */
    var wc = this;
    wc.testVar = 'We are up and running from a required module!';
  }
})();
