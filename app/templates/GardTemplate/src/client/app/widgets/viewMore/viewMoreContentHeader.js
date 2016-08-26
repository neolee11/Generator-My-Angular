(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('viewMoreContentHeader', viewMoreContentHeader);

    /* @ngInject */
    function viewMoreContentHeader() {

        function controller() {
            /*jshint maxcomplexity:30 */
            /* jshint validthis:true */
            var vm = this;

            vm.close = function () {
                vm.modalInstance.close('close');
            };
        }

        return {
            restrict: 'E',
            scope: {
                title: '@',
                modalInstance: '='
            },
            link: function (scope, element, attrs) {
                //add some event listeners later
                //console.log(scope.vm.tag);
            },
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/widgets/viewMore/viewMoreContentHeaderTemplate.html'
        };
    }
})();