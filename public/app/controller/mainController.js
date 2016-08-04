  
//_____________________Main coatroller______________________________

app.controller('maincontroller',['$scope','$location','$window','$http','Auth','SessionService','$route','$localStorage',
	      function ($scope,$location,$window,$http,Auth,SessionService,$route, $localStorage) {
	      	$scope.userLoged = Auth.isUserLoggedIn();
              console.log($scope.userLoged);
$scope.userLogout=function(){
	 Auth.userlogout()
	   .then(function (response) {

      SessionService.unset('auth');
       $localStorage.userpp="";
    // location.reload(); 
        $location.path("/login");
            }, function (error) {
                $window.alert("not logout");
                console.log(error);   
            });
}
$scope.isUserLoggedIn = function() {
     return Auth.isUserLoggedIn();
   };

 }]);


  //__________________________________________________