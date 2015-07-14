var myApp = angular.module('myApp.controllers',['ngRoute','ngAnimate','toaster','ngStorage','myApp.fileUploadDirective']);

myApp.controller('MainController',['$scope','$sessionStorage','AuthService',function($scope, $sessionStorage, AuthService){
    console.log("MainController initialized");
}]);

myApp.controller('LoginController',['$scope','$http','toaster','$location','AuthService','$rootScope',function($scope, $http, toaster,$location, authService,$rootScope){
    console.log("LoginController initialized");
    
    if(authService.getToken())
        $location.path('/dashboard');
    
    $scope.login = function(){
        var url = 'http://ec2-52-27-49-156.us-west-2.compute.amazonaws.com:8080/klonify/api/v1/authentication?username='+$scope.loginData.username+'&password='+$scope.loginData.password;
        //console.log($scope.loginData);
        var promise = $http.post(url,{});
        promise.then(function(a){
            authService.setToken(a.data.base64EncodedAuthenticationKey);
            authService.setUID(a.data.userId);
			authService.setFirstName(a.data.username);
			authService.setLastName("");//a.data.lastName
			$rootScope.loggedInUser = authService.getLoggedInUserName();
            $location.path('/dashboard');
            toaster.pop('success', "Success", a.data.message);
            
        },function(a, b, c, d){
            toaster.pop('error', "Error", a.data.message);
        });
    };
    
    
    $scope.clear = function(){
        $scope.loginData = {};
    };
}]);


myApp.controller('SignupController',['$scope','$http','toaster','$location','AuthService','$rootScope',function($scope, $http, toaster,$location, authService,$rootScope){
    console.log("SignupController initialized");
    $scope.signupData = {};
    if(authService.getToken()){
        $location.path('/dashboard');   
    }
    
    $scope.signup = function(){
        
        var url = 'https://xray-rhino.codio.io:9500/signup';
        var data = $scope.signupData;
        if(typeof(data.email) === 'undefined' || 
           typeof(data.firstName) === 'undefined' ||
           typeof(data.lastName) === 'undefined' ||
           typeof(data.password) === 'undefined' ||
           typeof(data.rpassword) === 'undefined'
          ){
            $scope.signupData.error = "Please enter registration data!";
            $scope.signupData.errorFlag = true;
            console.log($scope.signupData.error);
            return;
        }else if(data.password !== data.rpassword){
            $scope.signupData.error = "Password is not matching, please enter correct password!";
            $scope.signupData.errorFlag = true;
            console.log($scope.signupData.error);
            return;
        }
        
        var promise = $http.post(url,$scope.signupData);
        promise.then(function(a){
            authService.setToken(a.data.token);
			authService.setFirstName(a.data.firstName);
			authService.setLastName(a.data.lastName);
			authService.setUID(a.data.id);
			$rootScope.loggedInUser = authService.getLoggedInUserName();
            console.log(authService.getToken());
			
            $location.path('/dashboard');
            toaster.pop('success', "Success", a.data.message);
            
        },function(a, b, c, d){
            toaster.pop('error', "Error", a.data.message);
        });
    };
    
    
    $scope.clear = function(){
        $scope.signupData = {};
    };
}]);


myApp.controller('CreateTeplateController', ['$scope','$http','toaster','AuthService','$location', function($scope,$http,toaster,authService,$location) {
    
    console.log('CreateTeplateController initialized'); 
    
    $scope.formData = {};
	
	$scope.files = [];

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });
    
    $scope.submit = function(){
		$scope.formData.id = authService.getUID();
		var fd = new FormData();
		console.log($scope.files);
		for (var i = 0; i < $scope.files.length; i++) {
			fd.append('file' + i, $scope.files[i]);
			console.log($scope.files[i]);
		}
		console.log('out of loop');
		fd.append('templateData', angular.toJson($scope.formData));
		$http.post('https://xray-rhino.codio.io:9500/createTemplate/'+authService.getUID(), fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
			$scope.formData = {};
			fd = undefined;
            $location.path('/dashboard');
        })
        .error(function(){
			console.log("error");
            toaster.pop('error', "Error", "template not saved!");
        });
		
		
		/*$http({
            method: 'POST',
            url: "https://xray-rhino.codio.io:9500/api/photo",
            headers: { 'Content-Type': undefined },
			transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < data.files; i++) {
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            data: { formData: $scope.formData, files: $scope.files }
        });*/
		
		
        /*$http.post('https://xray-rhino.codio.io:9500/createTemplate',$scope.formData).success(function(a,b,c,d){
            console.log("success");
            toaster.pop('success', "Success", "template successfully saved");
            $scope.formData = {};
            $location.path('/dashboard');
        }).error(function(a,b,c,d){
            console.log("error");
            toaster.pop('error', "Error", "template not saved!");
        });*/
    };
    
    
}]);

myApp.controller('NavBarController', ['$scope','toaster','AuthService','$location','$rootScope', function($scope, toaster, authService, $location, $rootScope) {        
    console.log("NavBarController initialized");
	$rootScope.loggedInUser = authService.getLoggedInUserName();
	
    $scope.logout = function(){
        if(authService.logout().token === undefined){
            $location.path('/login');
        }
    };
}]);

myApp.controller('LandingPageController',['$scope','toaster','AuthService','$location','$http',function($scope, toaster, authService, $location, $http){
    $scope.data = {};
    $scope.data.limit = 14;
    $scope.data.offset = 0;
    console.log('LandingPageController initialized');
    $http.get('https://xray-rhino.codio.io:9500/getAllTemplate').success(function(a,b,c,d){
        console.log("success");
        $scope.templateData = a;
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
    }).error(function(a,b,c,d){
        console.log("error");
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
    });
    
    $scope.getCategory = function(category){
        console.log(angular.toJson(category));
        return category;
    };
    $scope.logout = function(){
        if(authService.logout().token === undefined){
            $location.path('/login');
        }
    };
    
}]);


/*
 RESTCall.templates.getAll($scope.data);
    RESTCall.templates.getSingle($scope.data);
    RESTCall.templates.update($scope.data);
    RESTCall.templates.create($scope.data);
    RESTCall.templates.delete($scope.data);
*/
