export default ngModule =>
{
  var providerName = 'ccUtils';

  class ccUtils {
    /*@ngInject*/
    constructor($http, $window, $log, $q) {
      this._$http = $http;
      this._$log = $log;
      this._$window = $window;
      this._$q = $q;

    }
  }
  ngModule.service(providerName, ccUtils);
};
