'use strict';
var myApp = angular.module('myApp', ['ngSanitize', 'ngMessages', 'ngAnimate', 'ngResource', 'ui.router', 'LocalStorageModule', 'bzUtilities'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'localStorageServiceProvider', 
    function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {

    // Init localStorage
    localStorageServiceProvider.setPrefix('bzApp').setStorageType('localStorage').setStorageCookie(0, '/').setNotify(true, true);

    // Enable HTML5 API PushState
    $locationProvider.html5Mode(enabledHtml5Mode).hashPrefix('!');

    // Routing
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    // Home
    .state('home', {
        url: '/',
        title: 'Home',
        views: {
            '': {
                templateUrl: 'angularjs/home/view.tpl',
                controller: 'homeCtrl',
                resolve: {
                    hotel: function(homeSvc){
                        return homeSvc.getHotelName();
                    },
                    room: function(homeSvc){
                        return homeSvc.getRoomNo();
                    }
                }
            }
        }
    })

    // About Us
    .state('about', {
        url: '/about-us',
        title: 'About Us',
        templateUrl: 'angularjs/about/view.tpl',
        controller: 'aboutCtrl'
    })

    // Work
    .state('work', {
        url: '/work',
        title: 'Work',
        templateUrl: 'angularjs/work/view.tpl',
        controller: 'workCtrl'
    })

    // Services
    .state('service', {
        url: '/services',
        title: 'Services',
        templateUrl: 'angularjs/service/view.tpl',
        controller: 'serviceCtrl'
    })

    // Careers
    .state('career', {
        url: '/careers',
        title: 'Careers',
        templateUrl: 'angularjs/career/view.tpl',
        controller: 'careerCtrl'
    })

    // Học bằng lái xe
    .state('contact', {
        url: '/contact-us',
        title: 'Contact Us',
        templateUrl: 'angularjs/contact/view.tpl',
        controller: 'contactCtrl'
    });
}]);