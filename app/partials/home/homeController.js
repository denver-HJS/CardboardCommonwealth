import { shipments } from "./shipments";

var _ = require('lodash');

export default ngModule => {

  var controllerName = 'homeController';

  class homeController {
    /*@ngInject*/
    constructor($rootScope,$scope, $log,$state, $timeout,$resource,$window, $q, igUtils,
                userService, DTOptionsBuilder, DTColumnBuilder,persistenceService,mappingService)
    {
      // Constructor specific variables
      var vm = this;
      var COL_PREF_TITLE = "I-dtColumnsPref";
      // end constructor variables
      vm.$scope = $scope;
      vm._$log = $log;
      vm.$state = $state;
      vm.$timeout = $timeout;
      vm.$resource = $resource;
      vm.persistenceService=persistenceService;
      vm.inspectionContext = vm.inspectionService.getInspectionContext();
      vm.insRefreshTimeStmp =vm.inspectionService.getRefreshTimeStmp();
      vm.DTOptionsBuilder = DTOptionsBuilder;
      vm.DTColumnBuilder = DTColumnBuilder;
      vm.shipments = shipments;
      vm.inspectionShipments = vm.listInspectionShipments();
      vm.selectedShipments = [];
      vm.listCount="2";
      vm.dtInstance = {};
      vm.dtOptions = {};
      vm.mappingService = mappingService;
      vm.dtColumns = igUtils.getPreference("I-dtColumnsPref").then((value) => {
          var defer = $q.defer();
          defer.resolve(vm.getDefaultListCols(angular.fromJson(value)));
          return defer.promise;
      },
      (error) => {
        return vm.$resource('data/dtColumns.json').query().$promise.then(function(d) {
          return vm.getDefaultListCols(d);
        });
      });


      vm.toggleVis = function(idx, visible) {
        var vm = this;
        vm._$log.debug("Toggle column visibility for column:"+idx + " to visible:"+visible);
        vm.dtInstance.dataTable.fnSetColumnVis(idx, visible);

      }

      /*triggers on ShiftChange */
      vm.$scope.$on('shiftChanged',($event, inspectionContext) => {
        vm.inspectionShipments=vm.listInspectionShipmentsForShiftChange();
        vm.reloadData();
      });

      /*triggers on SICChange */
      vm.$scope.$on('sicChanged',($event, inspectionContext) => {
        vm.persistenceService.delete("PRO");
        vm.inspectionShipments = vm.listInspectionShipments();
        vm.reloadData();
      });

      /**
       * Saves table settings preferences to SQLite on state change
       */
      vm.$state.current.onExit = () => {
        var vm = this;
        var serializedColData = angular.toJson(vm.slipListItems);
        igUtils.setPreference(COL_PREF_TITLE, serializedColData).then(
          () => {
            // setting preference was successful
          },
          () => {
            vm._$log.debug(controllerName + "[onExit]: external function SetPreference not found. Column Settings were not saved.");
          }
        );
      };

    } //end constructor

  }

  ngModule.controller(controllerName, homeController);

}
