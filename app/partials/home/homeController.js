var _ = require('lodash');

export default ngModule => {

  var controllerName = 'homeController';

  class homeController {
    /*@ngInject*/
    constructor($rootScope, $scope, $log, $state, $timeout, $resource, $window, $q, ccUtils,
                userService,persistenceService,mappingService)
    {
      // Constructor specific variables
      var vm = this;
      // end constructor variables
      vm.$scope = $scope;
      vm._$log = $log;
      vm._$state = $state;
      vm._$timeout = $timeout;
      vm._$resource = $resource;
      vm._ccUtils = ccUtils;
      vm._persistenceService = persistenceService;
      vm._mappingService = mappingService;

    } //end constructor

  }

  ngModule.controller(controllerName, homeController);

}
