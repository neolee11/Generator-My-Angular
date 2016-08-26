(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('questionDisplay', questionDisplay);

    /* @ngInject */
    function questionDisplay() {

        /* @ngInject */
        function controller($scope, $location, $anchorScroll, $compile, utilService) {

            $scope.$watch(function (scope) {
                return scope.processedReferences;
            }, function () {
                appendProcessedRefToReferences();
            });

            function appendProcessedRefToReferences() {
                if ($scope.references) {
                    $scope.references.forEach(function (element, index) {
                        element.processedRef = $scope.processedReferences[index];
                    });
                }
            }

            $scope.gotoQuestion = function (questionId) {
                // set the location.hash to the id of
                // the element you wish to scroll to.
                $location.hash(questionId);
                $anchorScroll();
            };

            $scope.gotoRef = function (referenceId) {
                //console.log('gotoRef called');
                $location.hash(referenceId);
                $anchorScroll();
            };

            $scope.showReferenceSection = function () {
                return $scope.references && $scope.references.length > 0;
            };
        }

        return {
            restrict: 'E',
            scope: {
                question: '=',
                references: '=',
                processedReferences: '=',
                isBasicQuestion: '='
            },
            link: function (scope, element, attrs) {
                //add some event listeners later
            },
            controller: controller,
            //controllerAs: 'vm',
            //bindToController: true,
            templateUrl: 'app/widgets/questionDisplayTemplate.html'
        };
    }
})();