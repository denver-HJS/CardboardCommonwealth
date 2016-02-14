"use strict"

import angular from "angular"

var moduleName = "wikiService"
var providerName = "wikiSearch"

class wikiSearch {
  /*@ngInject*/
  constructor($log, rx, $http) {
    this.$log = $log
    this.rx = rx
    this.$http = $http
    this.wikiEndPoint = "http://en.wikipedia.org/w/api.php"
  }

  searchWikipedia (term) {
    this.$log.debug(`Searching Wikipedia for ${term}...`)
    return this.rx.Observable
      .fromPromise(this.$http({
        url: `${this.wikiEndPoint}?&callback=JSON_CALLBACK`,
        method: "jsonp",
        params: {
          action: "opensearch",
          search: term,
          format: "json"
        }
      }))
      .map((response) => { return response.data; })
  }
}

angular.module(moduleName, []).service(providerName, wikiSearch)
