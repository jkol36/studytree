var appModule = angular.module('appModule', ['ngRoute', 'thirdPartyModule', 'authenticationModule']);

appModule.config(['$routeProvider',
	function($routeProvider){
	$routeProvider
	.when('/success',
	{
		templateUrl: 'html/success.html'
	})
	.when('/parents/payment',
	{
		controller: 'cardInputController',
		templateUrl: 'thirdPartyCardPartial.html'
	})
	.when('/signin',
	{
		controller: 'signinController',
		templateUrl: 'html/signinPartial.html'
	})
	.when('/signup',
	{
		controller: 'signupController',
		templateUrl: 'html/signupPartial.html'
	})
	.when('/test',
	{
		controller: 'cardInputController',
		templateUrl: 'html/test.html'
	})
	.otherwise({
		redirectTo: '/about'
	});
}]);

appModule.controller('aboutController', function($scope){
	
})