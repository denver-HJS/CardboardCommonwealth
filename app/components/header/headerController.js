export default ngModule => {

  var controllerName = 'ccHeaderController';

  class ccHeaderController {
    /* @ngInject */
    constructor($rootScope, $scope, $state, $log, $mdDialog, $mdSidenav, $timeout, navigationService,
        CODE_CONSTANTS) {
      this._$rootScope=$rootScope;
      this._$scope=$scope;
      this._$state=$state;
      this._$log=$log;
      this._$mdDialog = $mdDialog;
      this._$mdSidenav = $mdSidenav;
      this._$timeout = $timeout;
      this._navigationService = navigationService;
      this._CODE_CONSTANTS = CODE_CONSTANTS;
      this.headerClassList = [];
      this.headerClassList.push("toolbar-" + $state.current.data.toolbarClass);
      this.isRootState = this.isRootState();
    }

    toggleSideNav() {
      var vm = this;
      vm._$mdSidenav('side-nav').toggle();
    }

    isRootState() {
      var vm = this;
      if (vm._$state.current.data.rootState && vm._$state.current.data.rootState == true) {
        return true;
      } else {
        return false;
      }
    }

    prevState() {
      var vm = this;
      var prevState = vm._navigationService.popState();
      if(prevState) {
        vm._$state.go(prevState);
      }
    }
  }

  ngModule.controller('ccHeaderController', ccHeaderController);
}
