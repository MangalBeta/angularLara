//************use for upload image
app.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function(){
            scope.$apply(function(){
               modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
}]);

app.directive('onKeyup', function() {
  return function(scope, elm, attrs) {
    elm.bind("keyup", function() {
      scope.$apply(attrs.onKeyup);
    });
  };
});