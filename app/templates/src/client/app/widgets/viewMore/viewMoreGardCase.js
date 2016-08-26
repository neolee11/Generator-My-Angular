(function () {
    'use strict';

    angular
        .module('app.widgets')
        .controller('ViewMoreGardCase', ViewMoreGardCase);

    /* @ngInject */
    function ViewMoreGardCase($scope, $modalInstance, content, $location, $anchorScroll, $timeout, userNavigationService) {
        $scope.content = content;

        $scope.content.references.forEach(function(element, index) {
            element.processedRef = $scope.content.processedReferences[index];
        });

        $scope.modalInstance = $modalInstance;

        $scope.gotoQuestion = function(questionId) {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash(questionId);
            $anchorScroll();
        };

        $scope.gotoRef = function(referenceId) {
            //console.log('go to ref');
            $location.hash(referenceId);
            $anchorScroll();
        };

        //vm.basicQuestion.question = $sce.trustAsHtml(vm.basicQuestion.questionText);
        //vm.basicQuestion.answer = $sce.trustAsHtml(vm.basicQuestion.answerText);

        //$scope.selected = {
        //    item: $scope.items[0]
        //};

        $scope.gotoContactPage = function () {
            userNavigationService.recordInputScreenActivity('contact');
            userNavigationService.recordUserNavigationStep();
            console.log($scope.modalInstance);
            $scope.modalInstance.close('close');
            userNavigationService.scrollToParentTop();
        };

        $scope.close = function () {
            //$modalInstance.close('close');
            $scope.modalInstance.close('close');
        };

        //$scope.cancel = function () {
        //    $modalInstance.dismiss('cancel');
        //};

        $scope.showReferenceSection = function() {
            return $scope.content.references.length > 0;
        };

    }

})();

