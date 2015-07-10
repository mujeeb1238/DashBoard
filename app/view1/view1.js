'use strict';

angular.module('myApp.view1', ['ngRoute','ngAnimate','toaster'])

.controller('DashBoardController', ['$scope','$http','toaster', function($scope,$http,toaster) {
        
    $scope.formData = {}
    $scope.submit = function(){
        $http.post('https://xray-rhino.codio.io:9500/createTemplate',$scope.formData).success(function(a,b,c,d){
            toaster.pop('success', "Success", "template successfully saved");
            $scope.formData = {};
        }).error(function(a,b,c,d){
            toaster.pop('error', "Error", "template not saved!");
            
        });
    };
    $scope.clear = function(){
        $scope.formData = {};
    }
}]);