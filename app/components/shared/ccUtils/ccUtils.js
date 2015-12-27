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

    normalizeUrl(urlInput) {
      var urlOutput = "";
      urlOutput = urlInput.replace(/ /g, "-").toLowerCase();
      return urlOutput;
    }
  }
  ngModule.service(providerName, ccUtils);
};
