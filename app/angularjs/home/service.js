myApp.factory("homeSvc",['$q', function($q) {
	return {
		getHotelName: function() {
			return $q.when("abc");
		},
		getRoomNo: function() {
			var dfd = $q.defer()
			setTimeout(function() {
				dfd.resolve('xyz');
			}, 100)
			return dfd.promise;
		}
	};
}]);