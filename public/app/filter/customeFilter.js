//search filetr

app.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.title.toLowerCase().indexOf(searchString) !== -1){
            result.push(item);
        }
        });
        return result;
    };
});

///start   from pagination
 app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

//  app.filter('myfilter', function() {
//   return function(input, condition){
//     var filtered = [];
//     input.forEach(function(item, index){
//       if(item.id > condition){
//         filtered.push(item);
//       }
//     });
//     return filtered;
//   };
// });