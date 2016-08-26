/// <reference path="input.html" />
(function () {
    'use strict';

    angular
        .module('app.results')
        .config(configRoutes);

    /* @ngInject */
    function configRoutes($stateProvider) {

        $stateProvider.state('results',
            {
                url: "/results?diseaseId",
                templateUrl: 'app/results/results.html',
                controller: 'Results',
                controllerAs: 'vm',
                title: 'results',
                resolve: {
                    /* @ngInject */
                    tagIdsWithContent: function ($stateParams, dataService, userInputsService, utilService) {

                        var tags = userInputsService.getSelectedTags();
                        if (tags && tags.length > 0) {
                            //utilService.log('result resolve selectedTags', tags);
                            return getTagsWithContent();
                        }
                        else {
                            return dataService.getDiseaseInformationTags()
                                .then(function (data) {
                                    userInputsService.setSelectedTags(data);
                                    return getTagsWithContent();
                                });
                        }

                        function getTagsWithContent() {
                            var tags = userInputsService.getSelectedTags();
                            if ($stateParams.diseaseId) {
                                return dataService.getDiseaseTagsWithContent($stateParams.diseaseId, _.pluck(tags, 'tagId'))
                                    .then(function (data) {
                                        return data;
                                    }).catch(function (error) {
                                        console.log(error);
                                    });
                            }
                        }
                    },
                    /* @ngInject */
                    currentDisease: function (dataService, userInputsService, $stateParams) {

                        if (userInputsService.getSelectedDisease()) {
                            return userInputsService.getSelectedDisease();
                        }
                        else {
                            var diseaseIdParam = $stateParams.diseaseId;
                            //var badDisease = {id: 0, name: 'Disease Not Selected'};
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
                }
            }
        );
    }

    /* @ngInject */
    //function configRoutes($routeProvider) {
    //    $routeProvider.when('/results',
    //       {
    //           templateUrl: 'app/results/results.html',
    //           controller: 'Results',
    //           controllerAs: 'vm',
    //           title: 'results'
    //       }
    //   );
    //}

})();
