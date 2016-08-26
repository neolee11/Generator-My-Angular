(function () {
    'use strict';

    angular
        .module('app.widgets')
        .controller('ViewMoreGeneralText', ViewMoreGeneralText);

    /* @ngInject */
    function ViewMoreGeneralText($scope, $modalInstance, content) {
        $scope.content = content;
        $scope.title = $scope.content.header;
        $scope.modalInstance = $modalInstance;

        $scope.close = function () {
            $scope.modalInstance.close('close');
        };
    }

})();

