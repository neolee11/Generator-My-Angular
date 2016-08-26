(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('ginAudio', ginAudio);

    /* @ngInject */
    function ginAudio(ngAudio, $sce) {

        function controller() {
            /*jshint maxcomplexity:30 */
            /* jshint validthis:true */
            var vm = this;
            console.log(vm.audioPath);
            console.log(vm.cssClass);

            /*
             Trust audio resource solution:
             http://stackoverflow.com/questions/23659395/can-i-use-angular-variables-as-the-source-of-an-audio-tag
             */
            //vm.audio = $sce.trustAsResourceUrl(vm.audioPath); //trustAsResourceUrl is needed to work with Audio tag. Now use filter instead
        }

        return {
            restrict: 'E',
            scope: {
                audioPath: '=',
                cssClass: '@'
            },
            link: function (scope, element, attrs)
            {

            },
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/widgets/ginAudioTemplate.html'
        };
    }
})();