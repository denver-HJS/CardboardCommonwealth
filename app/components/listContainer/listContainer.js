export default ngModule => {
    ngModule.directive('listContainer', () => {
        return {
            restrict: 'E',
            scope: {
              title: '@',
              extract: '@',
              srcLink: '@'
            },
            templateUrl: 'components/listContainer/index.html',
            controller: 'listContainerController as vm',
            compile: compile
        }
    });

    function compile(element, attrs, transclude) {

    }
};
