(function () {
    'use strict';

    angular
        .module('app.widgets')
        .controller('ViewMoreLink', ViewMoreLink);

    /* @ngInject */
    function ViewMoreLink($scope, $modalInstance, content) {
        $scope.content = content;

        $scope.title = 'Links - ' + $scope.content.resourceDescription.resourceName;

        $scope.modalInstance = $modalInstance;

        $scope.close = function () {
            $scope.modalInstance.close('close');
        };
    }

})();

