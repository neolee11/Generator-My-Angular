(function () {
    'use strict';

    angular
        .module('app.input2')
        .controller('Input2', Input2);

    /* @ngInject */
    function Input2($state, userInputsService, utilService, allDiseaseInformationTags, currentDisease, userNavigationService, $stateParams, $scope) {
        var vm = this;

        vm.showBackButton = false;
        if ($stateParams.diseaseId) {
            vm.showBackButton = false;
        }
        vm.temp = $scope;
        vm.selectedDisease = {id: 0, name: 'Disease Not Selected'};
        vm.selectedAll = false;

        if (userInputsService.getSelectedDisease()) {
            vm.selectedDisease = userInputsService.getSelectedDisease();       
        }

        userNavigationService.recordScreenName('input2');
        if (!userNavigationService.getUserId() || userNavigationService.getUserId() === 0)
        {
            userNavigationService.recordSelectedDisease(vm.selectedDisease);
            userNavigationService.recordInputScreenActivity(userNavigationService.getScreenName());
        }
        
        vm.title = 'What would you like to know about ' + vm.selectedDisease.name + '?';
        vm.diseaseInformationTags = allDiseaseInformationTags;

        vm.ckb = [];
        syncCheckbox();

        vm.selectAllChange = function () {
            if (vm.selectedAll) {
                allDiseaseInformationTags.forEach(function (element) {
                    userInputsService.addSelectedTag(element);
                });
            }
            else {
                allDiseaseInformationTags.forEach(function (element) {
                    userInputsService.removeSelectedTag(element);
                });
            }
            syncCheckbox();
        };

        vm.tagSelectionChange = function (tag) {
            vm.selectedAll = false;
            var id = tag.tagId;
            if (vm.ckb[id]) {
                userInputsService.addSelectedTag(tag);
                syncCheckbox();
            }
            else {
                userInputsService.removeSelectedTag(tag);
            }
        };

        function syncCheckbox() {
            vm.ckb = [];
            if (userInputsService.getSelectedTags().length > 0) {
                userInputsService.getSelectedTags().forEach(function (element) {
                    vm.ckb[element.tagId] = true;
                });
            }
        }

        vm.clickContinue = function () {
            userNavigationService.pauseAudio();
            userNavigationService.recordTagSelection(userInputsService.getSelectedTags());
            userNavigationService.recordInputScreenActivity('input3');
            userNavigationService.recordUserNavigationStep();
            userNavigationService.scrollToParentTop();
        };

        vm.clickBack = function () {
            userNavigationService.pauseAudio();
            $state.go('inputs');
        };

        vm.continueDisabled = function () {
            return false;
            //return userInputsService.getSelectedTags().length === 0;
        };

        vm.viewSelectedTags = function () {
            console.log(userInputsService.getSelectedTags());
        };

        vm.getBackPath = function () {
            userNavigationService.pauseAudio();
            return 'inputs';       
        };

    }

})();