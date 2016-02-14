export default ngModule => {
  var controllerName = 'sideNavController';

  class sideNavController {
    /*@ngInject*/
    constructor($scope, $log, $mdDialog) {
      this._$scope = $scope;
      this._$log = $log;
      this._$mdDialog = $mdDialog;
      this._findInput="";
      this._menuItems = this.buildMenuItems();
    }

    scan(ev) {

      this._$mdDialog.show({
        controller: 'sideNavController as nav',
        templateUrl: 'partials/nav/scan.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };


    add(ev) {
      this._$mdDialog.show({
        controller: 'sideNavController as nav',
        templateUrl: 'partials/nav/add.html',
        parent: angular.element(document.body),
        targetEvent: ev,
      }).then(function (answer) {
        this._$log.debug("AddProCall " + answer);
      });
    };

    onSubmitDialog(sicChanger) {
      this._$mdDialog.hide(sicChanger);
    }

    buildMenuItems() {
      return [
        {"displayTitle" : "HOME", "stateRef" : "home"},
        {"displayTitle" : "ARTISTS", "stateRef" : "artists"},
        {"displayTitle" : "ABOUT US", "stateRef" : "aboutus"},
        {"displayTitle" : "SEARCH", "stateRef" : "searchWiki"}
        ];
    }

  }

  ngModule.controller(controllerName, sideNavController);
}
