(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('organizationDisplay', organizationDisplay);

    /* @ngInject */
    function organizationDisplay() {

        function controller() {
            /*jshint maxcomplexity:30 */
            /* jshint validthis:true */
            var vm = this;
        }

        return {
            restrict: 'E',
            scope: {
                organization: '=',
                showResourceName: '='
            },
            link: function (scope, element, attrs) {
                //add some event listeners later
                //console.log(scope.vm.tag);
            },
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/widgets/organizationDisplayTemplate.html'
        };
    }
})();