/// <reference path="input.html" />
(function() {
    'use strict';

    angular
        .module('app.input3')
        .config(configRoutes);

    /* @ngInject */
    function configRoutes($stateProvider) {

        $stateProvider.state('input3',
            {
                url: "/input3",
                templateUrl: 'app/input3/input3.html',
                controller: 'Input3',
                controllerAs: 'vm',
                title: 'User Input 3',
                resolve: {
                    /* @ngInject */
                    allLivingWithTags: function (dataService, userInputsService) {
                        if (userInputsService.getAllLivingWithTags()) {
                            return userInputsService.getAllLivingWithTags();
                        }
                        else {
                            return dataService.getLivingWithTags()
                                .then(function (data) {
                                    userInputsService.setAllLivingWithTags(data);
                                    return data;
                                }).catch(function (error) {
                                    console.log(error);
                                });
                        }
                    }
                }
            }
        );
    }

})();
