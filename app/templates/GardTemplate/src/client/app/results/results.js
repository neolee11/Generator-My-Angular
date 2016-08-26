(function () {
    'use strict';

    angular
        .module('app.results')
        .controller('Results', Results);

    /* @ngInject */
    function Results($stateParams, $sce, $window, userInputsService, dataService, utilService, tagIdsWithContent, currentDisease, userNavigationService) {

        var vm = this;

        vm.disease = currentDisease;
        vm.selectedTags = userInputsService.getSelectedTags();
        //utilService.log('resulsts controller selected tags', vm.selectedTags);
        userNavigationService.recordScreenName('results');

        vm.displayingTags = [];
        vm.nonDisplayingTags = [];

        vm.selectedTags.forEach(function (element) {
            var index = _.findIndex(tagIdsWithContent, function (tagId) {
                return tagId === element.tagId;
            });

            if (index >= 0) {
                vm.displayingTags.push(element);
            }
            else {
                vm.nonDisplayingTags.push(element);
            }
        });

        displayTagContent(0);

        function getResultPageContent() {
            if (vm.currDisplayTag) {
                //console.log(vm.currDisplayTag);
                //vm.currDisplayTag.tagAudio = "https://rarediseases.info.nih.gov/files/gin/Welcome.mp3"; //testing only
                //vm.currDisplayTag.tagAudio = ""; //testing only
                //From database example: [tblTag].[AudioFilePath] = ~/files/Tag_Audio/Looking for Details_Symptoms.mp3

                //showSpinner(); //not doing it for now
                dataService.getDiseaseTagCards($stateParams.diseaseId, vm.currDisplayTag.tagId)
                    .then(function (data) {
                        vm.cardContents = [];
                        vm.basicQuestion = null;
                        vm.abrrevBasicQuestion = null;
                        vm.showLessBasicQuestion = true;
                        vm.showReadMoreBasicQuestionButton = true;
                        data.forEach(function (element) {

                            if (element.cardType === 'BasicQuestion') {
                                if (vm.basicQuestion == null) {
                                    vm.basicQuestion = element;
                                    createAbbrevBasicQuestion();
                                }
                            }
                            else {
                                vm.cardContents.push(element);
                            }
                        });
                        outputMixedCards(vm.cardContents);
                        userNavigationService.recordResultScreenActivity(vm.currDisplayTag.tagName);
                        userNavigationService.recordUserNavigationStep();

                        //utilService.simulatelongRunningFunction();
                        //hideSpinner();
                    })
                    .catch(function (error) {
                        console.log(error);
                        //hideSpinner();
                    });
            }
        }

        function createAbbrevBasicQuestion() {
            if (!vm.basicQuestion) {
                return;
            }

            var basicQuestionCharLimit = 800;
            vm.abrrevBasicQuestion = {};
            vm.abrrevBasicQuestion.question = _.clone(vm.basicQuestion.question, true);

            var textContent = removeHTMLTags(vm.abrrevBasicQuestion.question.answerText);

            if (textContent.length > basicQuestionCharLimit) {
                //remove superscript
                vm.abrrevBasicQuestion.question.answerText = removeSupTagAndEnclosingContent(vm.abrrevBasicQuestion.question.answerText);
                var originalHtml = vm.abrrevBasicQuestion.question.answerText;
                vm.abrrevBasicQuestion.question.answerText = vm.abrrevBasicQuestion.question.answerText.substring(0, basicQuestionCharLimit + 50);
                vm.abrrevBasicQuestion.question.answerText = utilService.formatTruncatedHtml(vm.abrrevBasicQuestion.question.answerText, originalHtml);
                if (vm.abrrevBasicQuestion.question.answerText.indexOf(' ...') < 0) {
                    vm.abrrevBasicQuestion.question.answerText += ' ...';
                }

                vm.abrrevBasicQuestion.question.lastReviewedDate = null; //don't display last updated date
                vm.showReadMoreBasicQuestionButton = true;
            }
            else {
                vm.abrrevBasicQuestion.references = _.clone(vm.basicQuestion.references, true);
                vm.abrrevBasicQuestion.processedReferences = _.clone(vm.basicQuestion.processedReferences, true);
                vm.showReadMoreBasicQuestionButton = false;
            }
        }

        function removeHTMLTags(s) {
            var rex = /(<([^>]+)>)/ig;
            return s.replace(rex, "");
        }

        function removeSupTagAndEnclosingContent(s) {
            var rex = /<(sup)(?:(?!<\/?\1).)*?<\/\1>/ig;
            return s.replace(rex, "");
        }

        vm.showTagContent = function () {
            //return vm.currDisplayTagIndex < vm.displayingTags.length;
            if (vm.currDisplayTagIndex < vm.displayingTags.length) {
                return true;
            }
            else if (!vm.currDisplayTagIndex) { //solve the problem with brief showing of non-content tags
                return true;
            }
            else {
                return false;
            }
        };

        vm.gotoPrevTag = function () {
            displayTagContent(vm.currDisplayTagIndex - 1);
            userNavigationService.scrollToParentTop();
        };

        vm.gotoContact = function () {
            userNavigationService.recordInputScreenActivity('contact');
            userNavigationService.recordUserNavigationStep();
            userNavigationService.pauseAudio();
            userNavigationService.scrollToParentTop();
        };

        vm.prevTopicName = function () {
            var topicName = '';
            if (vm.currDisplayTagIndex - 1 >= 0) {
                topicName = vm.displayingTags[vm.currDisplayTagIndex - 1].tagName;
            }

            return 'Previous - ' + topicName;
        };

        vm.gotoNextTag = function () {
            displayTagContent(vm.currDisplayTagIndex + 1);
            userNavigationService.scrollToParentTop();

            //dataService.getAllDiseases().then(function(data){
            //   console.log('done');
            //});
            //
            //$timeout( tempFunc, $scope.sync.getDelay() ).then( function() {
            //    console.log("I'm called only after the timeout.");
            //    $scope.sync.releasePrivilege();
            //});
            //
            //console.log("But I get called immediately.");
        };

        vm.nextTopicName = function () {
            var topicName = '';
            var returnedval = '';
            if (vm.currDisplayTagIndex + 1 < vm.displayingTags.length) {
                topicName = vm.displayingTags[vm.currDisplayTagIndex + 1].tagName;
            }

            if (topicName !== '') {
                returnedval = 'Next - ' + topicName;
            }
            else {
                returnedval = 'Next ';
            }
            return returnedval;
        };

        function displayTagContent(currDisplayTagIndex) {
            vm.currDisplayTagIndex = currDisplayTagIndex;
            vm.currDisplayTag = vm.displayingTags[vm.currDisplayTagIndex];
            getResultPageContent();
        }

        vm.hidePrevTopic = function () {
            return vm.currDisplayTagIndex === 0;
        };

        vm.hideNextTopic = function () {
            if (vm.nonDisplayingTags.length > 0) {
                return vm.currDisplayTagIndex === vm.displayingTags.length;
            }
            else {
                return vm.currDisplayTagIndex === vm.displayingTags.length - 1;
            }
        };

        vm.tagChange = function () {
            //getResultPageContent($stateParams.diseaseId, vm.currDisplayTag.tagId);
        };

        function outputMixedCards(mixedCardsCollection) {
            var nextColumnIndexToReceiveCard = 0;
            var numCols = 3;
            var totalRecords = mixedCardsCollection.length;
            //var remainder = totalRecords % numCols;

            vm.columns = [
                {
                    collection: []
                },
                {
                    collection: []
                },
                {
                    collection: []
                }
            ];

            var currentColumnIndex = nextColumnIndexToReceiveCard;
            for (var i = 0; i < totalRecords; i++) {
                vm.columns[currentColumnIndex].collection.push(mixedCardsCollection[i]);
                currentColumnIndex++;
                if (currentColumnIndex === numCols) {
                    currentColumnIndex = 0;
                }
                nextColumnIndexToReceiveCard = currentColumnIndex;
            }
        }

        vm.ToggleReadMoreBasicQuestion = function () {
            vm.showLessBasicQuestion = !vm.showLessBasicQuestion;
        };

        vm.startOver = function () {
            userNavigationService.pauseAudio();
            userNavigationService.recordInputScreenActivity('start-over');
            userNavigationService.recordUserNavigationStep();
            userInputsService.clearSelectedTags();
            userNavigationService.clearScreenActivityLog();
            //$state.go(vm.getBackPath);
        };

        vm.getBackPath = function () {
            return 'input3';
        };

        function showSpinner(){
            var spinner = $("#loadingResultSpinner");
            //var spinner = $("#loadingSpinner");
            spinner.removeClass("hidden");
        }

        function hideSpinner(){
            var spinner = $("#loadingResultSpinner");
            spinner.addClass("hidden");
        }
    }

})();
