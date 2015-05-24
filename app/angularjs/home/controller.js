myApp.controller('homeCtrl', ['$scope', 'hotel', 'room', function ($scope, hotel, room) {
	$scope.name = "Tin";
	$scope.place = "Switzerland";
	$scope.hotel = hotel;
	$scope.roomno = room;
}]);