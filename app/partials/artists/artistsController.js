export default ngModule =>
{
  var controllerName = 'artistsController';

  class artistsController {
    /*@ngInject*/
    constructor($log, $state, SITE_CONTENT, ccUtils) {
      this._$log = $log;
      this._$state = $state;
      this._SITE_CONTENT = SITE_CONTENT;
      this._ccUtils = ccUtils;
      this._artists_list = this.buildArtistsSrc();
    }

    buildArtistsSrc() {
      var srcArr = [];
        angular.forEach(this._SITE_CONTENT.ARTISTS, (value, idx) => {
          value.stateRef = this._ccUtils.normalizeUrl(value.name);
          srcArr.push(value);
        });
        return srcArr;
    }
  }

  ngModule.controller(controllerName, artistsController);
};
