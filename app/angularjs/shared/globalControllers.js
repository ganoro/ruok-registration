angular.module('bzUtilities')
.controller('globalCtl', ['$scope', 'metaSvc', function ($scope, metaSvc) {
	$scope.metaData = metaSvc;
	$scope.linkPrefix = enabledHtml5Mode ? '' : '#!/';

	// Bắt sự kiện router đã thay đổi
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		$scope.metaData.setTitle(toState.title);
	});
}]);