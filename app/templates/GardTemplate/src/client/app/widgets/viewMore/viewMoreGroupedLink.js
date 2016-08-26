(function () {
    'use strict';

    angular
        .module('app.widgets')
        .controller('ViewMoreGroupedLink', ViewMoreGroupedLink);

    /* @ngInject */
    function ViewMoreGroupedLink($scope, $modalInstance, content) {
        $scope.content = content;

        $scope.title = $scope.content.header;

        $scope.modalInstance = $modalInstance;

        $scope.close = function () {
            $scope.modalInstance.close('close');
        };
    }

})();

