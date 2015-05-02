var config = require("../shared/models/config");
var el = require("../shared/models/el");
var httpModule = require("http");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");

var groceries = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

exports.load = function(args) {
	page = args.object;
    pageData.set("grocery", "");
    pageData.set("groceries", groceries);
	page.bindingContext = pageData;

    // Empty the array for subsequent visits to the page
	while (groceries.length) {
		groceries.pop();
	}
  
  loadGroceries();
};

function loadGroceries() {
  httpModule.getJSON({
      url: "http://api.everlive.com/v1/" + config.apiKey + "/Groceries",
      method: "GET"
  }).then(function(result) {
      result.Result.forEach(function(grocery) {
          groceries.push({ name: grocery.Name });
      });
  });
};