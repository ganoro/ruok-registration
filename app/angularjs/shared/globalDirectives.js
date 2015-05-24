angular.module('bzUtilities')
/****************************************************************************************
Description: Tự động tăng chiều cao cho textarea
*****************************************************************************************/
.directive('bzTextareaAutogrow', function () {
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs, ngModel) {
			var minHeight, paddingLeft, paddingRight, $shadow = null;
			iElement.css('overflow', 'hidden');
			function createShadow(){
				minHeight = iElement[0].offsetHeight;
				if (minHeight === 0)
					return ;
				paddingLeft = iElement.css('paddingLeft');
				paddingRight = iElement.css('paddingRight');

				$shadow = angular.element('<div></div>').css({
					position: 'absolute',
					top: -10000,
					left: -10000,
					width: iElement[0].offsetWidth - parseInt(paddingLeft ? paddingLeft : 0, 10) - parseInt(paddingRight ? paddingRight : 0, 10),
					fontSize: iElement.css('fontSize'),
					fontFamily: iElement.css('fontFamily'),
					lineHeight: iElement.css('lineHeight'),
					resize: 'none'
				});
				angular.element(document.body).append($shadow);
			}

			var update = function() {
				if ($shadow === null)
					createShadow();
				if ($shadow === null)
					return ;
				var times = function(string, number) {
					for (var i = 0, r = ''; i < number; i++) {
						r += string;
					}
					return r;
				};
				var val = iElement.val().replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/&/g, '&amp;')
				.replace(/\n$/, '<br/>&nbsp;')
				.replace(/\n/g, '<br/>')
				.replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' '; });
				$shadow.html(val);
				iElement.css('height', Math.max($shadow[0].offsetHeight + 10, minHeight) + 'px');
			};

			iElement.bind('keyup keydown keypress change focus', update);
			scope.$watch(iAttrs.ngModel, update);
			scope.$watch(function(){ 
				return iElement[0].style.display != 'none'; 
			}, update); 			
		}
	};
})
/****************************************************************************************
Description: Kiểm tra mật khẩu trùng khớp
*****************************************************************************************/
.directive('passwordMatchValidator', function() {
	return {
		require: 'ngModel',
		link : function(scope, iElement, iAttrs, ngModel) {
			ngModel.$parsers.push(function(value) {
				ngModel.$setValidity('match', value === scope.$eval(iAttrs.passwordMatchValidator));
				return value;
			});
		}
	}
})
/****************************************************************************************
Description: Kiểm tra mật khẩu hợp lệ
*****************************************************************************************/
.directive('passwordValidator', function() {
	var PASSWORD_FORMATS = [/[^\w\s]+/,/[A-Z]+/,/\w+/,/\d+/];
	return {
		require: 'ngModel',
		link : function(scope, iElement, iAttrs, ngModel) {
			ngModel.$parsers.push(function(value) {
				var status = true;
				angular.forEach(PASSWORD_FORMATS, function(regex) {
					status = status && regex.test(value);
				});
				ngModel.$setValidity('password-characters', status);
				return value;
			});
		}
	}
})
/****************************************************************************************
Description: Kiểm tra dữ liệu tồn tại
*****************************************************************************************/
.directive('recordAvailabilityValidator', ['$http', function($http) {
	return {
		require : 'ngModel',
		link : function(scope, iElement, iAttrs, ngModel) {
			var apiUrl = iAttrs.recordAvailabilityValidator;

			function setAsLoading(bool) {
				ngModel.$setValidity('recordLoading', !bool); 
			}

			function setAsAvailable(bool) {
				ngModel.$setValidity('recordAvailable', bool); 
			}

			ngModel.$parsers.push(function(value) {
				if(!value || value.length == 0) return;

				setAsLoading(true);
				setAsAvailable(false);

				$http.get(apiUrl, { v : value })
				.success(function() {
					setAsLoading(false);
					setAsAvailable(true);
				})
				.error(function() {
					setAsLoading(false);
					setAsAvailable(false);
				});
				return value;
			})
		}
	}
}])
/****************************************************************************************
Description: Chọn ngày tháng
*****************************************************************************************/
.directive('bzDatePicker', function () {
	return {
		restrict: 'A',
		scope: {
			dateFormat: '@',
			monthMin: '@',
			monthMax: '@',
			yearMax: '@'
		},
		require: 'ngModel',
		link: function (scope, iElement, iAttrs, ngModel) {
			var curDate = new Date();
			var options = {
				changeMonth: true,
				changeYear: true,
				minDate: scope.monthMin || null,
				maxDate: scope.monthMax || null,
				yearRange: '1911:' + scope.yearMax || '',
				dateFormat: scope.dateFormat || 'dd/mm/yy',
				onChangeMonthYear: function(y, m, i){
					var date = new Date(y, m - 1, i.selectedDay);
					scope.$apply(function () {
						ngModel.$setViewValue(date.format(options.dateFormat));
						ngModel.$render();
					});
				},
				onSelect: function (date, data) {
					scope.$apply(function () {
						ngModel.$setViewValue(date);
					});
				}
			};
			iElement.datepicker(options);
		}
	};
})
/****************************************************************************************
Description: Tạo phân trang dữ liệu
*****************************************************************************************/
.directive('bzPaging', [function () {
	return {
		restrict: 'AE',
		replace:true,
		scope: {
			pageCurrent:'=',
			pageCount:'=',
			pageUrl:'@',
			pagePushstate:'='
		},
		template:'<div class="pagingWrap">'
		+'<a ng-href="{{pagePushstate + pageUrl}}/{{pageCurrent - 1 < 1 ? 1 : pageCurrent - 1}}" class="prev"><</a>'
		+'<a ng-href="{{pagePushstate + pageUrl}}/{{page}}" ng-repeat="page in pageVisible" class="num" ng-class="{active: page == pageCurrent}">{{page}}</a>'
		+'<a ng-href="{{pagePushstate + pageUrl}}/{{pageCurrent + 1 > pageCount ? pageCount : pageCurrent + 1}}" class="next">></a>'
		+'</div>',
		link: function (scope, iElement, iAttrs) {
			scope.pageVisible = [];
			var pageMin = Math.ceil(Math.min(Math.max(1, scope.pageCurrent - (pageVisibleCount / 2)), Math.max(1, scope.pageCount - pageVisibleCount + 1)));
			var pageMax = Math.ceil(Math.min(scope.pageCount, pageMin + pageVisibleCount - 1));
			for (var i = pageMin; i <= pageMax; i++) {
				scope.pageVisible.push(i);
			};
		}
	};
}])
/****************************************************************************************
Description: Tạo video youtube
*****************************************************************************************/
.directive('bzYoutube', ['$window',function ($window) {
	return {
		restrict: 'AE',
		link: function (scope, iElement, iAttrs) {
			iElement.on('click', function(event) {
				var tag = document.createElement('script');
				tag.src = "https://www.youtube.com/iframe_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

				var player;

				$window.onYouTubeIframeAPIReady = function() {
					player = new YT.Player('player', {
						playerVars: {
							autoplay: 0,
							html5: 1,
							fs:1,
							theme: "light",
							modesbranding: 0,
							color: "white",
							iv_load_policy: 3,
							rel:0,
							showinfo: 1,
							controls: 1
						},
						height: 300,
						width: 500,
						videoId: iAttrs.bzGrowSong,
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange
						}
					});

					function onPlayerReady(event) {
						event.target.playVideo();
					}

					function onPlayerStateChange(event) {
						if (event.data == YT.PlayerState.ENDED) {
							player.stopVideo();
						}
					}
				};
			});
}
};
}]);