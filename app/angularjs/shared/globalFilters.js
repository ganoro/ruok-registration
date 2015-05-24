angular.module('bzUtilities')
.filter('toInt', function () {
	return function (data) {
		return parseInt(data);
	};
})
.filter('toTimeFormat', function () {
	return function (data) {
		return parseInt(data).toHHMMSS();
	};
});