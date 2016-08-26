(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('resultPageControls', resultPageControls);

    /* @ngInject */
    function resultPageControls() {

        function controller(userNavigationService, $scope) {
            /*jshint maxcomplexity:30 */
            /* jshint validthis:true */
            var vm = this;
            vm.isStreaming = false;
            vm.audioElement = null;
            vm.hideAudio = false;

            //Set Audio Source 
            var audioSourceResults = "https://rarediseases.info.nih.gov/files/gin/Results.mp3";

            vm.close = function () {
                if ('parentIFrame' in window) {
                    window.parentIFrame.sendMessage('close');
                }
            };

            if (userNavigationService.getScreenName() === 'results') {
                vm.audioElement = new Audio(audioSourceResults);
                userNavigationService.setAudio(vm.audioElement);
                if (userNavigationService.getPlayedStatus('results') === false) {
                    setAutoplay();
                    userNavigationService.recordScreenPlayed('results', true);
                }
                else {
                    vm.isStreaming = false;
                }
            }

            if (userNavigationService.getScreenName() === 'contact') {
                vm.hideAudio = true;
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

            if (!vm.hideAudio){
                vm.audioElement.onended = function () {
                    vm.isStreaming = false;
                    $scope.$apply();
                };
            }
        }

        return {
            restrict: 'E',
            scope: {
                content: '='
            },
            link: function (scope, element, attrs) {
                //add some event listeners later
                //console.log(scope.vm.tag);
            },
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/widgets/resultPageControlsTemplate.html'
        };
    }
})();