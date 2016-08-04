app.factory("Auth", ["$http","$q","$window",'$localStorage','$route',function ($http, $q, $window,$localStorage,$route) {
var userLog;
//var checkAdmin=false;
  function auth(username, password) {
    var logindata={ 'email':username,'password':password }
   var deferred = $q.defer();     
     $http({
          method: 'post',
          url: "api/login/auth",
          dataType: "JSON",
          data:$.param(logindata) ,
          headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}

        }).then(function (result) {
              userLog=result
           $window.sessionStorage["userLog"] = JSON.stringify(userLog);
            deferred.resolve(userLog);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }
function userlogout() {
        var deferred = $q.defer();
        $http({
            method: "post",
            url: "api/logout/destroy",
          headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}

        }).then(function (result) {
            userLog = null;
        // $localStorage.checkAdmin=null;
     $window.sessionStorage["userLog"] = null;
             //$route.reload();
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
 function isUserLoggedIn() {
//console.log(userLog)
  return (userLog) ? true : false;
}
//isUserLoggedIn();
 function getClientInfo() {
        return userLog;
    }

  function initUser() {
        if ($window.sessionStorage["userLog"]) {
       userLog = JSON.parse($window.sessionStorage["userLog"]);
        }
    }
    initUser();
 return {
        auth: auth,
        userlogout: userlogout,
        getClientInfo: getClientInfo,
        isUserLoggedIn:isUserLoggedIn
    };
}]);