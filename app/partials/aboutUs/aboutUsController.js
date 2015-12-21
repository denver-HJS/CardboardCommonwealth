export default ngModule =>
{
  var controllerName = 'aboutUsController';

  class aboutUsController {
    /*@ngInject*/
    constructor($log, CODE_CONSTANTS) {
      this._$log = $log;
      this._CODE_CONSTANTS = CODE_CONSTANTS;
      this._staff = this.buildStaffSrc();
    }

    buildStaffSrc() {
      var srcArr = [];
      angular.forEach(this._CODE_CONSTANTS.STAFF, (value, idx) => {
        srcArr.push(value);
      });
      return srcArr;
    }
  }

  ngModule.controller(controllerName, aboutUsController);
};
