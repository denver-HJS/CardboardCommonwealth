export default ngModule =>
{
  var controllerName = 'searchWikiController';

  class searchWikiController {
    /*@ngInject*/
    constructor($scope, $log, rx, observeOnScope, wikiSearch) {
      this.$scope = $scope
      this.$log = $log
      this.rx = rx
      this.observeOnScope = observeOnScope
      this.wikiSearch = wikiSearch
      this.searchText = ""
      this.results = []

      observeOnScope($scope, 'vm.searchText')
      .debounce(300)
      .map((change) => {return change.newValue})
      .filter((w) => { return w && w !== "" })
      .flatMapLatest(this.wikiSearch.searchWikipedia.bind(this.wikiSearch))
      .subscribe((resp) => {
         this.results = []
         var zip = this.splitSearchResults(resp)
         this.applyResults(zip)
      })
    }

    splitSearchResults(dataSrc) {
      var titles = this.rx.Observable.from(dataSrc[1])
      var extracts = this.rx.Observable.from(dataSrc[2])
      var srcLinks = this.rx.Observable.from(dataSrc[3])

      return titles
        .zip(extracts, srcLinks, (t, e, l) => {
          return {
            title: t,
            extract: e,
            srcLink: l
          }
        })
    }

    applyResults(dataSrc) {
      dataSrc.subscribe((o) => { this.results.push(o) })
    }
  }

  ngModule.controller(controllerName, searchWikiController);
};
