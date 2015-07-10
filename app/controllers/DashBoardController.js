var myApp = angular.module('myApp.otherControllers',['ngRoute','ngAnimate','toaster','ngStorage']);

myApp.controller('DashBoardController',['$scope','toaster','AuthService','$location','$http',function($scope, toaster, authService, $location, $http){
    $scope.st = {};
    console.log('DashBoardController initialized');
    
    $http.get('https://xray-rhino.codio.io:9500/getAllTemplate/'+authService.getUID()).success(function(a,b,c,d){
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