var myApp = angular.module('myApp.otherControllers',['ngRoute','ngAnimate','toaster','ngStorage']);

myApp.controller('DashBoardController',['$scope','toaster','AuthService','$location','$http',function($scope, toaster, authService, $location, $http){
    $scope.st = {};
    console.log('DashBoardController initialized');
    
    $http.get('http://ec2-52-27-49-156.us-west-2.compute.amazonaws.com:8080/klonify/api/v1/users/'+authService.getUID()).success(function(a,b,c,d){
        console.log("success");
        $scope.templateData = a;
    }).error(function(a,b,c,d){
        console.log("error");
    });
	
	$scope.getSingleTemplate = function(data){
		
		$http.get('https://xray-rhino.codio.io:9500/getTemplate/'+data._id).success(function(a,b,c,d){
			console.log(a);
			$('#myModal').modal();
			$scope.st = a;
		}).error(function(a,b,c,d){
			console.log("error");
		});
	};
    
    
}]);