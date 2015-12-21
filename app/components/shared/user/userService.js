export default ngModule => {

  var providerName = 'userService';

  class userService {

    /* @ngInject */
    constructor ($http, $log, $window, ccUtils, mappingService, $q){
      this._$http = $http;
      this._$log = $log;
      this._$window = $window;
      this._$q = $q;
      this._ccUtils = ccUtils;
      this._mappingService = mappingService;

    }// end of constructor

    /* Call RestAPI to GET the USER DETAILS FROM USER DIRECTORY*/

  }

  ngModule.service(providerName, userService);
}
