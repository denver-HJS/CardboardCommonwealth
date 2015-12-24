export default ngModule => {

  var controllerName = 'homeController';

  class homeController {
    /*@ngInject*/
    constructor($rootScope, $scope, $log, $state, $timeout, $resource, $window, $q, ccUtils,
                userService,persistenceService,mappingService, SITE_CONTENT)
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
      vm._SITE_CONTENT = SITE_CONTENT;

      vm._news_list = vm.buildNewsSrc();

    } //end constructor

    buildNewsSrc() {
      var srcArr = [];
      angular.forEach(this._SITE_CONTENT.NEWS, (value, idx) => {
        srcArr.push(value);
      });
      return srcArr;
    }

  }

  ngModule.controller(controllerName, homeController);

}
