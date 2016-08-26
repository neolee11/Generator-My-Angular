(function(){
    'use strict';

    angular.module('app.widgets')
        .directive('dynamicCompile', DynamicCompile);

    /* @ngInject */
    function DynamicCompile($compile) {

        return {
            restrict: 'A',
            replace: true,
            link: function (scope, ele, attrs) {
                scope.$watch(attrs.dynamic, function(html) {
                    //console.log('dynamic compile kicks in');
                    ele.html(html);
                    $compile(ele.contents())(scope);
                });
            }
        };
    }
})();