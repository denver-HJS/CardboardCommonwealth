export default ngModule =>
{
  var controllerName = 'listContainerController';

  class listContainerController {
    /*@ngInject*/
    constructor($log) {
      this._$log = $log;
    }

    generatedFunc() {

    }
  }

  ngModule.controller(controllerName, listContainerController);
};
