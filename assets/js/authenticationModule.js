var authenticationModule = angular.module('authenticationModule', ['authenticationModule']);
var signInUrl = "http://studytreebroker2.azurewebsites.net/api/Login/ThirdPartyLogin"
var signUpUrl = "http://studytree2.azurewebsites.net/api/ThirdParty/SignUp"

authenticationModule
	.service('authenticateService', authenticateService)

authenticationModule
	.controller('signinController', signinController)
	.controller('signupController', signupController)

function signupController($scope, $location, $http){

	$scope.submit = function() {
		alert("hello");
		$.post(signUpUrl, $scope.user,function(data, status){
			alert(data);
			alert(status);
		});
	}
}

// $scope.user.username
// $scope.user.password
function signinController($scope, $location, authenticateService){

	$scope.submit = function() {
		alert("hello");
		// making call to the server and get authentication information
		var promise = authenticateService.authenticate($scope.user)

		promise.then(function(verifiedUser){
			alert(verifiedUser)
			$location.path('/success')
		}, function(reason){
			alert("Login fail " + reason);
		})
	}
}

function authenticateService($rootScope, $q){

	// service to authenticate user
	this.authenticate = function(userObj){
		alert("Authenticating")
		var deffered = $q.defer();

		$.post(signInUrl, {userName: userObj.username, password: userObj.password}, function(data, status){
			if(status == "success") {
				deffered.resolve(data);
			} else {
				deffered.reject(status);
			}
		});
		return deffered.promise
	};
}