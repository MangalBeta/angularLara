app.controller('loginController',['$scope','$location','$window','$http','Auth','SessionService','$routeParams','$localStorage',function ($scope,$location,$window,$http,Auth,SessionService,$routeParams,$localStorage) {

 $scope.signUpUser=function(){
 	var cdata={'name':$scope.myname,'lastname':$scope.lastname,'email':$scope.email, 'password':$scope.password};
 	   $http({
		  method: 'post',
		  url: "api/signup/user",
		  dataType: "JSON",
		  data:$.param(cdata) ,
          headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
		    console.log(response);
		    $location.path("/login");
		}, function errorCallback(response) {
		    console.log('error',response);
		   $location.path("/signup");
		  });
 }

$scope.userLogin=function(){
	     var auth=  Auth.auth($scope.email,$scope.pass)
          auth.then(function (response) {
          	$scope.loginuser=response.data;
            console.log($scope.loginuser);
        if($scope.loginuser.id){
    SessionService.set('auth',true); //This sets our session key/val pair as authenticated
         $location.path("/home")
        // $window.location.reload();
          }else 
          {
          	alert('could not verify your login');
          	   //$location.path("/login");
          }
         
            }, function (error) {
            	 $location.path("/login");
                $window.alert("Invalid credentials");
                console.log(error);   
            });
}

  }]);

