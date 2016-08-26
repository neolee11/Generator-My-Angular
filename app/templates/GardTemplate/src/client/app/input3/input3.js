(function () {
    'use strict';

    angular
        .module('app.input3')
        .controller('Input3', Input3);

    /* @ngInject */
    function Input3($state, userInputsService, utilService, allLivingWithTags, userNavigationService) {
        var vm = this;

        vm.title = 'Do you need resources for these topics?';
        vm.selectedDisease = { id: 0, name: 'Disease Not Selected' };

        userNavigationService.recordScreenName('input3');

        vm.selectedAll = false;
        if (userInputsService.getSelectedDisease()) {
            vm.selectedDisease = userInputsService.getSelectedDisease();
        }

        vm.livingWithTags = allLivingWithTags;

        vm.ckb = [];
        syncCheckbox();

        vm.selectAllChange = function () {
            if (vm.selectedAll) {
                allLivingWithTags.forEach(function (element) {
                    userInputsService.addSelectedTag(element);
                });
            }
            else {
                allLivingWithTags.forEach(function (element) {
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

        vm.continueDisabled = function () {
            if (userInputsService.undiagosedDiseaseSelected()) {
                return userInputsService.getSelectedTags().length === 0;
            }
            else {
                //Old requirement: user selected a disease, and selected something some disease information input page,
                // do not need to select from living with page
                //return false;

                //New requirement: user does not have to select any tag from disease information input page,
                //but needs to select at least one tag overall
                return userInputsService.getSelectedTags().length === 0;
            }
        };

        vm.clickContinue = function () {
            userNavigationService.pauseAudio();
            userNavigationService.recordTagSelection(userInputsService.getSelectedTags());
            userNavigationService.recordInputScreenActivity('results');
            userNavigationService.recordUserNavigationStep();
            $state.go('results', {diseaseId: vm.selectedDisease.id});
            userNavigationService.scrollToParentTop();
        };

        vm.clickBack = function () {
            userNavigationService.pauseAudio();
            userNavigationService.recordInputScreenActivity("input2");
            userNavigationService.recordUserNavigationStep();
            //$state.go(vm.getBackPath);
        };

        vm.getBackPath = function () {
            if (vm.selectedDisease.id === 0 || (vm.selectedDisease === userInputsService.getUndiagnosedDisease())) {
                // Add to Route
                return 'inputs';
            }
            else {
                return 'input2';
            }
        };

        vm.viewSelectedTags = function () {
            console.log(userInputsService.getSelectedTags());
        };
    }

})();

//vm.knowMore = [
//    'Find a specialist or expert',
//    'Find a specialty treatment center',
//    'Find a genetics clinic',
//    'Find a researcher who is studying a specific condition',
//    'Find support and others with undiagnosed conditions',
//    'To learn more about financial assistance for those undiagnosed'
//];