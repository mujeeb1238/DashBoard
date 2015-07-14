myApp = angular.module('myApp.services', ['ngStorage']);
myApp.factory('AuthService',['$sessionStorage',function($sessionStorage){
    return{
		setFirstName: function(firstName){
			$sessionStorage.firstName = firstName;
		},
		getFirstName: function(){
			return $sessionStorage.firstName;	
		},
		setLastName: function(lastName){
			$sessionStorage.lastName = lastName;
		},
		getLastName: function(){
			return $sessionStorage.lastName;	
		},
        setUID: function(uid){
            $sessionStorage.uid = uid;
        },
        getUID: function(){
            return $sessionStorage.uid;
        },
        setToken: function(token){
            $sessionStorage.token = token;
        },
        getToken: function(){
            return $sessionStorage.token;
        },
        logout: function(){
            delete $sessionStorage.token;
            delete $sessionStorage.userData;
            delete $sessionStorage.uid;
			delete $sessionStorage.firstName;
			delete $sessionStorage.lastName;
            return $sessionStorage;
        },
		getLoggedInUserName: function(){
			//return this.getLastName()+', '+this.getFirstName();
			return this.getFirstName();
		}
		
    }
}]);