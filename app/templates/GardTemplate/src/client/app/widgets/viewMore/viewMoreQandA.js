(function () {
    'use strict';

    angular
        .module('app.widgets')
        .controller('ViewMoreQandA', ViewMoreQandA);

    /* @ngInject */
    function ViewMoreQandA($scope, $modalInstance, content, $location, $anchorScroll) {
        $scope.content = content;

        $scope.content.references.forEach(function(element, index) {
            element.processedRef = $scope.content.processedReferences[index];
        });

        $scope.gotoQuestion = function(questionId) {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash(questionId);
            $anchorScroll();
        };

        $scope.gotoRef = function(referenceId) {
            $location.hash(referenceId);
            $anchorScroll();
        };

        $scope.modalInstance = $modalInstance;

        $scope.close = function () {
            $scope.modalInstance.close('close');
        };

        $scope.showReferenceSection = function() {
            return $scope.content.references.length > 0;
        };
    }

})();

