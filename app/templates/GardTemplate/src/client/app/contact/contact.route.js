/// <reference path="input.html" />
(function() {
    'use strict';

    angular
        .module('app.contact')
        .config(configRoutes);

    /* @ngInject */
    function configRoutes($stateProvider) {

        $stateProvider.state('contact',
            {
                url: "/contact",
                templateUrl: 'app/contact/contact.html',
                controller: 'Contact',
                controllerAs: 'vm',
                title: 'Contact Us'
            }
        );
    }

})();
