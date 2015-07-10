var myApp = angular.module('myApp.restCalls',['ngResource']);

myApp.factory('RESTCall',['$resource',function($resource){
    console.log('REST CALL SERVICE INITIALIZED!!!');
    var baseUri = 'https://titanic-develop.codio.io/app/';
    
    var Remote = {
        
        templates: $resource(baseUri+':verb',{
            offset: '@offset',
            limit: '@limit',
            query: 'QueryParamValue',
            verb: 'verb'
        },{
            'getAll': {method: 'get'},
            'getSingle': {method: 'get'},
            'create': {method: 'post'},
            'update': {method: 'put'},
            'delete': {method: 'delete'}
        })
        
    };
    
    return Remote;
    
}]);