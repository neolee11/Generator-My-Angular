(function() {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appTitle: 'GARD Wizard',
        version: '1.0.0',
        webApiUrl: 'http://localhost:51208/'
    };

    core.value('config', config);
})();
