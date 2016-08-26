(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('ginConfirmClose', ginConfirmClose);

    /* @ngInject */
    function ginConfirmClose($modal) {

        /* @ngInject */
        function ModalInstanceCtrl($scope, $modalInstance, userInputsService, userNavigationService) {
            $scope.ok = function () {
                userInputsService.clearUserInputs();
                userNavigationService.stopAudio();
                userNavigationService.clearScreenActivityLog();
                $modalInstance.close();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }

        return {
            restrict: 'A',
            scope: {
                ginConfirmClose: "&"
            },
            link: function (scope, element, attrs) {

                element.bind('click', function() {
                    var message = "Are you sure ?";

                    /*
                     //This works
                     if (message && confirm(message)) {
                     scope.$apply(attrs.ngReallyClick);
                     }
                     //*/

                    //var modalHtml = '<div class="modal-body">' + message + '</div>';
                    //modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>';

                    var modalInstance = $modal.open({
                        //template: modalHtml,
                        //animation: true,
                        templateUrl: 'app/widgets/ginConfirmCloseTemplate.html',
                        controller: ModalInstanceCtrl
                    });

                    modalInstance.result.then(function() {
                        scope.ginConfirmClose();
                    }, function() {
                        //Modal dismissed
                    });
                });
            }
        };
    }
})();