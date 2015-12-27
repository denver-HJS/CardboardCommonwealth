export default ngModule => {
  require('./artistsController')(ngModule);
  require('./artistDtlsController')(ngModule);
};
