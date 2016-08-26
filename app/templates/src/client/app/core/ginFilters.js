(function () {
    'use strict';

    angular.module('app.core')
        .filter('trust', TrustFilter)
        .filter('trustedAudioUrl', TrustedAudioUrl);

    /* @ngInject */
    function TrustFilter($sce) {
        return function(value, type) {
            // Defaults to treating trusted text as `html`
            return $sce.trustAs(type || 'html', value);
        };
    }

    /* @ngInject */
    function TrustedAudioUrl($sce){
        return function(audioFilePath) {
            return $sce.trustAsResourceUrl(audioFilePath);
        };
    }
})();
