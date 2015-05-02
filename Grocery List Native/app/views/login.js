var dialogs = require("ui/dialogs");
var el = require("../shared/models/el");
var frameModule = require("ui/frame");
var images = require("../shared/utils/images");
var pageData = require("../shared/models/userCredentials");
var viewModule = require("ui/core/view");
exports.load = function(args) {
  var page = args.object;
  var username = viewModule.getViewById(page, "username");
  pageData.set("logoSource", images.logo);
dialogs.alert("images.logo = " + images.logo);
  page.bindingContext = pageData;
  // Turn off autocorrect and autocapitalization for iOS
  if (username.ios) {
      username.ios.autocapitalizationType =
          UITextAutocapitalizationType.UITextAutocapitalizationTypeNone;
      username.ios.autocorrectionType =
          UITextAutocorrectionType.UITextAutocorrectionTypeNo;
  }
};
exports.signIn = function(args) {
  el.Users.login(
      pageData.get("username"),
      pageData.get("password"),
      function() {
//          frameModule.topmost().navigate("app/views/list");
          frameModule.topmost().navigate("views/list");
      },
      function() {
          dialogs.alert({
              message: "Unfortunately we could not find your account.",
              okButtonText: "OK"
          });
      }
  );
};