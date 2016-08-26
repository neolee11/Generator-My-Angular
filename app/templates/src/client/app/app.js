(function () {
    'use strict';

    var app = angular.module('app', [
        'ngAria',
        'app.core',
        'app.widgets',

        //feature area
        'app.inputs',
        'app.input2',
        'app.input3',
        'app.results',
        'app.contact',
        'app.layout'
    ]);

    app.constant('_', window._); // allow DI for use in controllers, unit tests
    app.config(configRoutes);
    app.run(registerComponents);

    //app.run(reloadRoute); //no longer needed as we now use ui-view

    /* @ngInject */
    function configRoutes($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("inputs");
        //$urlRouterProvider.otherwise("input2?diseaseId");

        //$locationProvider.html5Mode(
        //    {
        //        enabled: true,
        //        requireBase: false
        //    });
    }

    /* @ngInject */
    //function appController($scope) {
    //    $scope.$on('$stateChangeStart', stateChangeStartHandler);
    //
    //    /* @ngInject */
    //    function stateChangeStartHandler(event, toState, toParams, fromState, fromParams) {
    //        window.alert('in $stateChangeStart');
    //        if (toState.resolve) {
    //            //$scope.showSpinner();
    //            console.log('toState.resolve');
    //        }
    //    }
    //
    //    $scope.$on('$stateChangeSuccess', stateChangeSuccessHandler);
    //
    //    /* @ngInject */
    //    function stateChangeSuccessHandler(event, toState, toParams, fromState, fromParams) {
    //        window.alert('in stateChangeSuccessHandler');
    //        if (toState.resolve) {
    //            //$scope.hideSpinner();
    //            console.log('toState.resolve');
    //        }
    //    }
    //}

    /* @ngInject */
    function registerComponents($rootScope, userInputsService, userNavigationService) {
        $rootScope._ = window._;   // use in views, ng-repeat="x in _.range(3)"

        //var timeStart, timeEnd;
        var timeEnd;

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (toState.resolve) {
                    //timeStart = Date.now();

                    //console.log('on $stateChangeStart');
                    $("#loadingSpinner").removeClass("hidden");
                }
            });

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                if (toState.resolve) {
                    //console.log('on $stateChangeSuccess');
                    $("#loadingSpinner").addClass("hidden");

                    timeEnd = Date.now();

                    if (toState.name === 'input2' && window.timeStart != null) {
                        var elapsedTime = Math.abs(timeEnd - window.timeStart) / 1000; //in seconds
                        userNavigationService.recordApiCallTime(elapsedTime, toState.name);
                        window.timeStart = null;
                    }

                    if (!userInputsService.getSelectedDisease()) {
                        if ('parentIFrame' in window) {
                            window.parentIFrame.sendMessage('refresh');
                        }
                    }
                }
            });
    }

    /*
     This function is needed to solve rendering ng-view inside ng-include problem
     Check - http://stackoverflow.com/questions/16674279/how-to-nest-ng-view-inside-ng-include
     https://github.com/angular/angular.js/issues/1213
     */
    /* @ngInject */
    //function reloadRoute($route) {
    //    $route.reload();
    //}

})();
