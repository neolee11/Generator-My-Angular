(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('pageControls', pageControls);

    /* @ngInject */
    function pageControls() {

        function controller(userNavigationService, $scope) {
            /*jshint maxcomplexity:30 */
            /* jshint validthis:true */
            var vm = this;
            vm.isStreaming = false;
            vm.audioElement = null;
 
            vm.currentPage = userNavigationService.getScreenName();

            //Set Audio sources
            var audioSourceInputs = "https://rarediseases.info.nih.gov/files/gin/Welcome.mp3";
            var audioSourceInput2 = "https://rarediseases.info.nih.gov/files/gin/Welcome.mp3";
            var audioSourceInput3 = "https://rarediseases.info.nih.gov/files/gin/LivingWith.mp3";
           
            vm.close = function () {
                if ('parentIFrame' in window) {
                    window.parentIFrame.sendMessage('close');
                }
            };

            if (userNavigationService.getScreenName() === 'inputs') {
                vm.audioElement = new Audio(audioSourceInputs);
                userNavigationService.setAudio(vm.audioElement);
                if (userNavigationService.getPlayedStatus('inputs') === false) {
                    setAutoplay();
                    userNavigationService.recordScreenPlayed('inputs', true);
                }
            }
            else if (userNavigationService.getScreenName() === 'input2') {
                vm.audioElement = new Audio(audioSourceInput2);
                userNavigationService.setAudio(vm.audioElement);
                if (userNavigationService.getPlayedStatus('input2') === false) {
                    setAutoplay();
                    userNavigationService.recordScreenPlayed('input2', true);
                }
            }
            else if (userNavigationService.getScreenName() === 'input3') {
                vm.audioElement = new Audio(audioSourceInput3); 
                userNavigationService.setAudio(vm.audioElement);
                if (userNavigationService.getPlayedStatus('input3') === false) {
                    setAutoplay();
                    userNavigationService.recordScreenPlayed('input3', true);
                }
            }

            function setAutoplay() {

                userNavigationService.playAudio();
                vm.isStreaming = true;
            }

            vm.playItem = function () {
                userNavigationService.playAudio();
                vm.isStreaming = true;
            };

            vm.stopTrack = function () {
                if (vm.isStreaming) {
                    userNavigationService.pauseAudio();
                    vm.isStreaming = false;
                }
            };

            vm.audioElement.onended = function () {
                vm.isStreaming = false;
                $scope.$apply();              
            };

        }

        return {
            restrict: 'E',
            scope: {
                content: '='
            },
            link: function (scope, element, attrs)
            {
                
            },
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/widgets/pageControlsTemplate.html'
        };
    }
})();