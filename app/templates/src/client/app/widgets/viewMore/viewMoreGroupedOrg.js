(function () {
    'use strict';

    angular
        .module('app.widgets')
        .controller('ViewMoreGroupedOrg', ViewMoreGroupedOrg);

    /* @ngInject */
    function ViewMoreGroupedOrg($scope, $modalInstance, content) {
        $scope.content = content;

        //$scope.title = 'Organizations - ' + $scope.content.childTag.tagName;
        $scope.title = $scope.content.header;

        $scope.modalInstance = $modalInstance;

        $scope.close = function () {
            $scope.modalInstance.close('close');
        };
    }

})();

