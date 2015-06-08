var thirdPartyModule = angular.module('thirdPartyModule', ['thirdPartyModule']);
var clientAPILink = "http://studytree2.azurewebsites.net/api/BrainTree/GetSponserClientToken"
var postPaymentAPILink = "http://studytree2.azurewebsites.net/api/ThirdParty/PostSponserPayment"

thirdPartyModule
	.controller('cardInputController', cardInputController)

thirdPartyModule
	.service('clientTokenService', clientTokenService)

function cardInputController($scope, $window, $location, clientTokenService){
	var promise = clientTokenService.getClientToken()
	promise.then(function(tokenData){
		braintree.setup(
		  // Replace this with a client token from your server
		  tokenData["clientToken"],
		  'dropin', {
		    	container: 'dropin',
		    	paymentMethodNonceReceived : function(event, nonce) {
		    		var inputData = {
		    			userNameOrEmail : $scope.userId,
		    			firstName : $scope.firstName,
		    			lastName : $scope.lastName,
		    			amount: $scope.amount,
		    			nonce: nonce
		    		}
		    		var submitPromise = clientTokenService.submitNonce(inputData)
		    		submitPromise.then(function(result){
		    			alert(result)
		    		}, function(reason){
		    			alert(reason)
		    		})
		    	}
		  });
	}, function(reason){
		alert(reason)
	})
	$scope.submit = function() {
		alert($scope.cardNumber);
		$location.path('/success')
	}
}

function clientTokenService($rootScope, $q){
	// service to authenticate user
	this.getClientToken = function(){
		var deffered = $q.defer();
		$.get(clientAPILink, function(data, status){
			if(status == "success") {
				deffered.resolve(data);
			} else {
				deffered.reject(status);
			}
		});
		return deffered.promise
	};

	this.submitNonce = function(data){
		var deffered = $q.defer();
		alert(JSON.stringify(data))
		$.post(postPaymentAPILink, data, function(result, status){
			if(status == "success") {
				deffered.resolve(result);
			} else {
				deffered.reject(status);
			}
		});
		return deffered.promise
	}
}

thirdPartyModule.directive('ensureValid', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {
        $http({
          method: 'GET',
          url: 'http://studytree2.azurewebsites.net/api/ThirdParty/GetUserExist?usernameOrEmail=' + c.$modelValue,
        }).success(function(data, status, headers, cfg) {
        	if(status == 302) {
        		c.$setValidity('validId', true);
        	} else {
        		c.$setValidity('validId', false);
        	}
        }).error(function(data, status, headers, cfg) {
        	if(status == 302) {
        		c.$setValidity('validId', true);
        	} else {
        		c.$setValidity('validId', false);
        	}
        });
      });
    }
  }
}]);