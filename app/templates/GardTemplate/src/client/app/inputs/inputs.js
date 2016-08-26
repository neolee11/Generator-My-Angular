(function () {
    'use strict';

    angular
        .module('app.inputs')
        .controller('Inputs', Inputs);

    /* @ngInject */
    function Inputs($state, dataService, userInputsService, allDiseases, userNavigationService, $scope) {

        var vm = this;
        var inputPathDisease = 'Disease Path';
        var inputPathUndiagnosed = 'Undiagnosed Path';
        //vm.audioPlaying = $scope.audioElement;

        //Set screenName
        userNavigationService.recordScreenName('inputs');

        vm.title = 'How can we help?';
        vm.diseases = allDiseases;
        vm.opt1Selected = false;
        vm.opt2Selected = false;

        if (userInputsService.getSelectedDisease() === userInputsService.getUndiagnosedDisease()) {
            vm.opt2Selected = true;
        }
        else if (userInputsService.getSelectedDisease()) {
            vm.selectedDisease = userInputsService.getSelectedDisease();
            vm.opt1Selected = true;
        }

        vm.selectOption = function (optionIndex) {
            //console.log('selectOption' + optionIndex);
            vm.opt1Selected = optionIndex === 1;
            vm.opt2Selected = optionIndex === 2;
        };

        vm.clickContinue = function () {

            userNavigationService.pauseAudio();

            if (vm.opt1Selected) {
                userInputsService.setSelectedDisease(vm.selectedDisease);
                checkInputPath(inputPathDisease);
                //userNavigationService.recordSelectedDisease(vm.selectedDisease);
                //userNavigationService.recordInputScreenActivity('input2');
                $state.go('input2');

            }
            else if (vm.opt2Selected) {
                userInputsService.setSelectedDisease(userInputsService.getUndiagnosedDisease());
                checkInputPath(inputPathUndiagnosed);
                //userNavigationService.recordSelectedDisease(userInputsService.getSelectedDisease());
                $state.go('input3');
                //userNavigationService.recordInputScreenActivity('input3');
            }
        };

        vm.continueDisabled = function () {
            if (vm.opt1Selected) {
                return !vm.selectedDisease;
            }
            return !vm.opt1Selected && !vm.opt2Selected;
        };

        function checkInputPath(currInputPath) {
            if (userInputsService.getLastInputPath() !== currInputPath) {
                userInputsService.clearSelectedTags();
            }
            userInputsService.setLastInputPath(currInputPath);
        }

        //vm.getAllTags = function () {
        //    dataService.getDiseaseInformationTags()
        //        .then(function (tags) {
        //
        //        }).catch(function (error) {
        //            console.log(error);
        //        });
        //};
    }

})();