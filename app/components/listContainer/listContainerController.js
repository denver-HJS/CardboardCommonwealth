export default ngModule =>
{
  var controllerName = 'listContainerController';

  class listContainerController {
    /*@ngInject*/
    constructor($log) {
      this._$log = $log;
    }

    goToPage(url) {
      var win = window.open(url, '_blank');
      win.focus();
    }
  }

  ngModule.controller(controllerName, listContainerController);
};
