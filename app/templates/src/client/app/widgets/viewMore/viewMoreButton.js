(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('viewMoreButton', viewMoreButton);

    function viewMoreButton() {

        /* @ngInject */
        function controller($modal, userNavigationService, $scope, $timeout) {
            /*jshint maxcomplexity:30 */
            /* jshint validthis:true */
            var vm = this;
            var templateUrl, templateCtrl;

            vm.cardCharLimit = 400;
            vm.showButton = true;
            vm.viewButtonStyle = 'view-button-normal';
            vm.viewButtonText = 'View';

            if (vm.content) {
                if (vm.content.cardType === 'GardCase' || vm.content.cardType === 'QuestionAndAnswer') {
                    vm.bodyStyle = 'body-important';
                    vm.viewButtonStyle = 'view-button-important';
                }

                switch (vm.content.cardType) {
                    case 'Organization':
                        vm.showButton = false;
                        break;
                    case 'GroupedOrganization':
                        templateUrl = 'app/widgets/viewMore/viewMoreGroupedOrgTemplate.html';
                        templateCtrl = 'ViewMoreGroupedOrg';
                        vm.viewButtonText = 'View Organizations';
                        break;
                    case 'QuestionAndAnswer':
                        templateUrl = 'app/widgets/viewMore/viewMoreQandATemplate.html';
                        templateCtrl = 'ViewMoreQandA';
                        vm.viewButtonText = 'View Answer';
                        break;
                    case 'GardCase': //Your Questions Answered Card
                        templateUrl = 'app/widgets/viewMore/viewMoreGardCaseTemplate.html';
                        templateCtrl = 'ViewMoreGardCase';
                        vm.viewButtonText = 'View Answer';
                        break;
                    case 'GeneralText':
                        templateUrl = 'app/widgets/viewMore/viewMoreGeneralTextTemplate.html';
                        templateCtrl = 'ViewMoreGeneralText';
                        vm.showButton = vm.content.generalText.htmlContent.length > vm.cardCharLimit;
                        break;
                    case 'ResourceLink':
                        //templateUrl = 'app/widgets/viewMore/viewMoreLinkTemplate.html';
                        //templateCtrl = 'ViewMoreLink';
                        //vm.showButton = vm.content.resourceDescription.resourceDescriptionText.length > vm.cardCharLimit;
                        vm.showButton = false;
                        break;
                    case 'GroupedResourceLink':
                        templateUrl = 'app/widgets/viewMore/viewMoreGroupedLinkTemplate.html';
                        templateCtrl = 'ViewMoreGroupedLink';
                        var totalLen = _.sum(vm.content.descriptions, function (desc) {
                            return desc.resourceDescriptionText.length;
                        });
                        vm.showButton = totalLen > vm.cardCharLimit;
                        break;
                    default:
                        vm.viewButtonText = 'View';
                        break;
                }
            }

            var openedClassStyle = 'modal-open';
            if ('parentIFrame' in window) {
                openedClassStyle = 'hide-vertical-scroll';
            }

            vm.open = function () {
                var modalInstance = $modal.open({
                    //bindToController: true,
                    animation: true,
                    templateUrl: templateUrl,
                    controller: templateCtrl,
                    size: 'lg',
                    openedClass: openedClassStyle,
                    resolve: {
                        content: function () {
                            return vm.content;
                        }
                    }
                });

                (modalInstance.opened).then(modalOpened);
                userNavigationService.scrollToParentTop();
            };

            function modalOpened() {
                $timeout(function () {
                    angular.element('.view-more.modal-body').trigger('click');
                    //console.log('click event fired');
                }, 1000);
            }
        }

        return {
            require: '^resultCard',
            restrict: 'E',
            scope: {
                content: '='
            },
            link: function (scope, element, attrs) {
                //add some event listeners later
                //console.log(scope.vm.tag);
            },
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/widgets/viewMore/viewMoreButtonTemplate.html'
        };
    }
})();