(function () {
    'use strict';

    angular.module('app.widgets')
        .directive('resultCard', resultCard);

    /* @ngInject */
    function resultCard($sce, $log, utilService) {

        function controller() {
            /*jshint maxcomplexity:30 */
            /* jshint validthis:true */
            var vm = this;

            vm.bodyStyle = 'body-normal';
            vm.cardCharLimit = 400;
            vm.showHeader = true;

            vm.cardAudioSrc = vm.content.audioFilePath; //this is to use in production
            //vm.cardAudioSrc = "https://rarediseases.info.nih.gov/files/gin/Welcome.mp3"; //testing only

            if (vm.content) {
                if (vm.content.cardType === 'GardCase' || vm.content.cardType === 'QuestionAndAnswer') {
                    vm.bodyStyle = 'body-important';
                }

                switch (vm.content.cardType) {
                    case 'ResourceLink':
                        createResourceLinkCard();
                        break;
                    case 'GroupedResourceLink':
                        createGroupedResourceLinkCard();
                        break;
                    case 'Organization':
                        createOrganizationCard();
                        break;
                    case 'GroupedOrganization':
                        createGroupedOrganizationCard();
                        break;
                    case 'Video':
                        break;
                    case 'QuestionAndAnswer':
                        createQuestionAndAnswerCard();
                        break;
                    case 'MedicalProduct':
                        createMedicalProductCard();
                        break;
                    case 'Reference':
                        createReferenceCard();
                        break;
                    case 'GardCase': //Your Questions Answered Card
                        createYourQuestionsAnsweredCard();
                        break;
                    case 'GeneralResource':
                        createGeneralResourceCard();
                        break;
                    case 'GeneralText':
                        createGeneralTextCard();
                        break;
                    default:
                        break;
                }
            }

            function createResourceLinkCard() {
                var link = vm.content.resourceDescription;
                vm.content.header = link.resourceName;

                //var leadDesc = 'These resources cover basic information about this condition. <br/><br/>';
                vm.contentText = link.resourceDescriptionText;

                //vm.contentText = link.resourceDescriptionText.substring(0, vm.cardCharLimit);
                //if (link.resourceDescriptionText.length > vm.cardCharLimit) {
                //    vm.contentText += "...";
                //}
            }

            function createGroupedResourceLinkCard() {
                var links = vm.content.descriptions;
                //vm.content.header = "Links" + ' - ' + vm.content.childTag.tagName;
                vm.content.header = vm.content.childTag.tagName;

                var tagDescription = vm.content.childTag.tagDescription + '<br/><br/>';
                var contentDesc = [];
                var charLeft = vm.cardCharLimit;
                vm.content.descriptions.forEach(function (element) {
                    if (charLeft > 0) {
                        var originalHtml = element.resourceDescriptionText;
                        var currDescLink = element.resourceDescriptionText.substring(0, charLeft);
                        charLeft = charLeft - element.resourceDescriptionText.length;

                        if (charLeft < 0) {
                            currDescLink += ' ...';
                        }
                        currDescLink = utilService.formatTruncatedHtml(currDescLink, originalHtml);

                        if (currDescLink.length > 0) {
                            contentDesc.push(currDescLink);
                        }
                        else {
                            contentDesc.push("...");
                        }
                    }
                });

                vm.contentText = tagDescription;
                if (contentDesc.length > 0) {
                    vm.contentText += '<div class="result-card-grouped-link">';
                    vm.contentText += '<ul>';
                    contentDesc.forEach(function (element) {
                        if (element === '...') {
                            vm.contentText += element + '<br/>';
                        }
                        else {
                            vm.contentText += '<li>' + element + '<br/></li>';
                        }
                    });
                    vm.contentText += '</ul>';
                    vm.contentText += '</div>';
                }
            }

            function createOrganizationCard() {
                //console.log(vm.content.organization);

                vm.organization = vm.content.organization;
                vm.content.header = vm.organization.resourceName;
                //vm.cardImageSrc = 'images/organizations.jpg';
            }

            function createGroupedOrganizationCard() {
                //vm.content.header = 'Organizations ' + " - " + vm.content.childTag.tagName;
                vm.content.header = vm.content.childTag.tagName;
                vm.cardImageSrc = 'images/Grouped-Organizations.jpg';
                vm.contentText = vm.content.childTag.tagDescription;
            }

            function createQuestionAndAnswerCard() {
                //vm.showHeader = false;
                var question = vm.content.question;
                //vm.contentText = question.questionText;
                vm.content.header = question.questionText;
            }

            function createMedicalProductCard() {
                var product = vm.content.medicalProduct;
                vm.contentText = '<b>Trade name</b>: ' + product.tradeName + '<br/>' +
                    '<b>Generic name</b>: ' + product.genericName + '<br/>' +
                    '<b>Indication</b>: ' + product.indication + '<br/>' +
                    '<b>Drug Info Link</b>: ' + product.drugInformationLink + '<br/>';
            }

            function createReferenceCard() {
                var reference = vm.content.reference;
                vm.contentText = '<b>Article Title</b>: ' + reference.articleTitle + '<br/>' +
                    '<b>Book/Journal Tiel</b>: ' + reference.bookWebsiteJournalTitle + '<br/>' +
                    '<b>Authors</b>: ' + reference.authors + '<br/>' +
                    '<b>Date</b>: ' + reference.date + '<br/>' +
                    '<b>url</b>: ' + reference.url + '<br/>';
            }

            function createYourQuestionsAnsweredCard() {
                var gardCase = vm.content.case;
                vm.cardImageSrc = 'images/your_questions_answered.jpg';
                vm.contentText = gardCase.abbreviatedQuestion;
            }

            function createGeneralResourceCard() {
                var resource = vm.content.generalResource;
                vm.contentText = '<b>Name</b>: ' + resource.resourceName + '<br/>' +
                    '<b>Description</b>: ' + resource.description + '<br/>' +
                    '<b>Url</b>: ' + resource.url + '<br/>';
            }

            function createGeneralTextCard() {
                vm.content.header = vm.content.generalText.title;
                var generalText = vm.content.generalText;
                var originalHtml = generalText.htmlContent;
                vm.contentText = generalText.htmlContent.substring(0, vm.cardCharLimit);
                vm.contentText = utilService.formatTruncatedHtml(vm.contentText, originalHtml);
                if (generalText.htmlContent.length > vm.cardCharLimit && vm.contentText.indexOf(" ...") < 0) {
                    vm.contentText += " ...";
                }
                vm.contentText = utilService.formatTruncatedHtml(vm.contentText, originalHtml);
            }
        }

        return {
            restrict: 'E',
            scope: {
                content: '='
            },
            link: function (scope, element, attrs) {
                //add some event listeners later if needed
                //console.log(scope.vm.tag);
            },
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/widgets/resultCardTemplate.html'
        };
    }
})();

