export default ngModule =>
{
  var controllerName = 'artistsController';

  class artistsController {
    /*@ngInject*/
    constructor($log, SITE_CONTENT) {
      this._$log = $log;
      this._SITE_CONTENT = SITE_CONTENT;
      this._artists_list = this.buildArtistsSrc();
    }

    buildArtistsSrc() {
      var srcArr = [];
        angular.forEach(this._SITE_CONTENT.ARTISTS, (value, idx) => {
          srcArr.push(value);
        });
        return srcArr;
    }
  }

  ngModule.controller(controllerName, artistsController);
};
