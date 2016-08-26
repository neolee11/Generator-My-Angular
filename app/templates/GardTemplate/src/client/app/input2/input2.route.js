/// <reference path="input.html" />
(function () {
    'use strict';

    angular
        .module('app.input2')
        .config(configRoutes);

    /* @ngInject */
    function configRoutes($stateProvider) {

        $stateProvider.state('input2',
            {
                //url: "/input2",
                url: "/input2?diseaseId",
                templateUrl: 'app/input2/input2.html',
                controller: 'Input2',
                controllerAs: 'vm',
                title: 'User Input 2',
                resolve: {
                    /* @ngInject */
                    allDiseaseInformationTags: function (dataService, userInputsService) {
                        if (userInputsService.getAllDiseaseInformationTags()) {
                            return userInputsService.getAllDiseaseInformationTags();
                        }
                        else {
                            return dataService.getDiseaseInformationTags()
                                .then(function (data) {
                                    userInputsService.setAllDiseaseInformationTags(data);
                                    return data;
                                }).catch(function (error) {
                                    console.log(error);
                                });
                        }
                    },
                    /* @ngInject */
                    currentDisease: function (dataService, userInputsService, $stateParams) {
                        if (userInputsService.getSelectedDisease()) {
                            return userInputsService.getSelectedDisease();
                        }
                        else {
                            var diseaseIdParam = $stateParams.diseaseId;
                            if (angular.element.isNumeric(diseaseIdParam)) {
                                return dataService.getDiseaseById(diseaseIdParam)
                                    .then(function (data) {
                                        userInputsService.setSelectedDisease(data);
                                        return data;
                                    }).catch(function (error) {
                                        console.log(error);
                                        return userInputsService.getUndiagnosedDisease();
                                    });
                            }
                            else {
                                return userInputsService.getUndiagnosedDisease();
                            }
                        }
                    }
                    /* @ngInject */
                    //fakeWait: function($timeout){
                    //    //simulate a long wait
                    //    return $timeout(function(){
                    //        console.log('Finished mock Waiting');
                    //    }, 5000);
                    //}

                    ///* @ngInject */
                    //allLivingWithTags: function (dataService, userInputsService) {
                    //    if (userInputsService.getAllLivingWithTags()) {
                    //        return userInputsService.getAllLivingWithTags();
                    //    }
                    //    else {
                    //        return dataService.getLivingWithTags()
                    //            .then(function (data) {
                    //                userInputsService.setAllLivingWithTags(data);
                    //                return data;
                    //            }).catch(function (error) {
                    //                console.log(error);
                    //            });
                    //    }
                    //}
                }
            }
        );
    }

})();
