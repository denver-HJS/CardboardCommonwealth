import moment from 'moment';
import _ from 'lodash';

export default ngModule => {
  var providerName = 'mappingService';

  class mappingService {
    /*@ngInject*/
    constructor($filter, CODE_CONSTANTS) {
      var vm = this;
      // Angular Module Deps
      vm.$filter = $filter;
      // injected IG dependencies here
      vm.CODE_CONSTANTS = CODE_CONSTANTS;
    }

    /**
     * Transfers a property from one object to another. If the property is not found in the source object, the default
     * value will be assigned.
     * @param mapObj Object the property should be assigned to
     * @param dataSrc Object the property is read from
     * @param mappedKey Property name that will be assigned to the mapObj param
     * @param srcKey Property name to be referenced from the dataSrc param
     * @param defaultVal
     */
    mapProp(mapObj, dataSrc, mappedKey, srcKey, defaultVal) {
      mapObj[mappedKey] = (typeof dataSrc[srcKey] !== 'undefined' && dataSrc[srcKey] !== null) ? dataSrc[srcKey] : defaultVal;
    }

  }
  ngModule.service(providerName, mappingService);
};
