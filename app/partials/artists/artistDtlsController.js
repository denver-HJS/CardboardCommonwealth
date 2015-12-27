export default ngModule =>
{
  var controllerName = 'artistDtlsController';

  class artistDtlsController {
    /*@ngInject*/
    constructor($log, $stateParams, ccUtils, SITE_CONTENT) {
      this._$log = $log;
      this._$stateParams = $stateParams;
      this._ccUtils = ccUtils;
      this._SITE_CONTENT = SITE_CONTENT;
      this._selectedArtist = {};

      this.activate();
    }

    activate() {
      this._$log.debug("Activating artist details!");
      angular.forEach(this._SITE_CONTENT.ARTISTS, (value, idx) => {
        if(this._ccUtils.normalizeUrl(value.name) == this._$stateParams.id) {
          this._selectedArtist = value;
        }
      });
    }
  }

  ngModule.controller(controllerName, artistDtlsController);
};
