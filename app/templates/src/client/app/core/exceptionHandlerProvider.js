(function () {
    'use strict';

    angular.module('app.core')
        .config(configExceptionHandler);

    /* @ngInject */
    function configExceptionHandler($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    /* @ngInject */
    function extendExceptionHandler($delegate, $injector, $window) {
        return function (exception, cause) {

            var dataService = $injector.get("dataService");
            var utilService = $injector.get("utilService");

            $delegate(exception, cause); //call default exception handler - just log to the console

            var errorObj = {
                errorUrl: $window.location.href,
                errorMsg: exception.message,
                stackTrace: utilService.printStackTrace({e: exception})
            };

            //console.log(errorObj.errorUrl);
            //console.log(errorObj.errorMsg);
            //console.log(errorObj.stackTrace);

            dataService.reportError(errorObj);
        };
    }
})();
