export default ngModule => {
  ngModule.directive('contentTile', () => {
    return {
      restrict: 'AE',
      scope: {
        'tileImg': '@',
        'footerIcon': '@',
        'footerText': '='
      },
      controller: controllerFn,
      controllerAs: 'vm',
      templateUrl: 'components/contentTile/index.html'
    };
  });

  /* @ngInject */
  function controllerFn($scope) {
    $scope.hovering = false;
  }
};
