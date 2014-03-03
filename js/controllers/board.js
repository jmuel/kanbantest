angular.module('board', ['firebase', 'ui.bootstrap'])
.controller('Board', ['$scope', '$firebase',
	function ($scope, $firebase) {
		$scope.cardList = new Firebase('https://kanbantesting.firebaseio.com/cards');
		$scope.cards = $firebase($scope.cardList);
		$scope.addCard = function() {
			$scope.cards.$child($scope.cardNumber).$set({
				content: $scope.description,
				status: "backlog",
				cardNumber: $scope.cardNumber
			});
			$scope.description = "";
		}
		$scope.modifyCard = function() {
			$scope.cards.$child($scope.modifyCardNumber).$child("content").$set($scope.modifyDescription);
		}
		$scope.deleteCard = function(id) {
			$scope.cards.$remove(id);
		}
		$scope.moveCard = function(id, destination) {
			$scope.cards.$child(id).$child("status").$set(destination);

		}
	}])