export default ngModule => {
  require('./ccUtils')(ngModule);
  require('./mappingService')(ngModule);
  require('./persistenceService')(ngModule);
  require('./navigationService')(ngModule);
  require('./dialogService')(ngModule);
};
