var app = angular.module('app', ['ui.router','oc.lazyLoad'])
    .config(['$urlRouterProvider',
            '$stateProvider', 
            function($urlRouterProvider, $stateProvider)
            {
        
                $urlRouterProvider.otherwise('/404');
                $urlRouterProvider.when('', '/home');
                $urlRouterProvider.when('/', '/home');
        
                $stateProvider
                    .state('home', {
                        url: '/home',
                        views: {
                            'main': {
                                templateUrl: 'home/view.html',
                                controller: 'homeController'
                            }
                        },
                        resolve: {
                            modules: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load(['home/homeController.js','components/navbar/navbar.js']);
                            }]
                        }
                    })
                    .state('about', {
                        url: '/cv',
                        views: {
                            'main': {
                                templateUrl: 'about/view.html',
                                controller: 'aboutController'
                            }
                        }
                    })
                    .state('404', {
                        url: '/404',
                        views: {
                            'main': {
                                templateUrl: '404/view.html'
                                //controller: '404Controller'
                            }
                        }
                    });
            }]);
