/// <reference path="input.html" />
(function () {
    'use strict';

    angular
        .module('app.inputs')
        .config(configRoutes);

    /* @ngInject */
    function configRoutes($stateProvider) {

        $stateProvider.state('inputs',
            {
                url: "/inputs",
                templateUrl: 'app/inputs/inputs.html',
                controller: 'Inputs',
                controllerAs: 'vm',
                title: 'User Inputs',
                resolve: {
                    /* @ngInject */
                    allDiseases: function (dataService, userInputsService) {
                        if (userInputsService.getAllDiseases()) {
                            //console.log('get all diseases from user inputs service');
                            return userInputsService.getAllDiseases();
                        }
                        else {
                            return dataService.getAllDiseases()
                                .then(function (data) {
                                    userInputsService.setAllDiseases(data);
                                    //console.log('get all diseases from web api');
                                    return data;
                                }).catch(function (error) {
                                    console.log(error);
                                });
                        }
                    }
                    ///* @ngInject */
                    //fakeWait: function($timeout){
                    //    //simulate a long wait
                    //    return $timeout(function(){
                    //        console.log('Finished mock Waiting');
                    //    }, 5000);
                    //}
                }
            }
        );
    }

})();
