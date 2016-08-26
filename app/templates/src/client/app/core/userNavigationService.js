(function () {
    'use strict';

    angular.module('app.core')
        .factory('userNavigationService', userNavigationService);

    /* @ngInject */
    function userNavigationService(dataService, userInputsService, config) {

        var selectedDisease;
        var selectedTags = '';
        var userId;
        var actualScreen;
        var inputScreens = '';
        var resultScreens = '';
        var contactUsPageCompleted;
        var contactUsPageReached;
        var screen1Played = false;
        var screen2Played = false;
        var screen3Played = false;
        var screenResultsPlayed = false;
        var audio;

        var service = {
            userId: userId,
            selectedDisease: selectedDisease,
            inputScreens: inputScreens,
            selectedTags: selectedTags,
            contactUsPageReached: contactUsPageReached,
            contactUsPageCompleted: contactUsPageCompleted,
            getUserId: getUserId,
            recordScreenName: recordScreenName,
            getScreenName: getScreenName,
            recordSelectedDisease: recordSelectedDisease,
            recordTagSelection: recordTagSelection,
            recordInputScreenActivity: recordInputScreenActivity,
            recordResultScreenActivity: recordResultScreenActivity,
            clearScreenActivityLog: clearScreenActivityLog,
            recordContactPageReachedActivity: recordContactPageReachedActivity,
            recordContactPageCompletedActivity: recordContactPageCompletedActivity,
            recordUserNavigationStep: recordUserNavigationStep,
            recordApiCallTime: recordApiCallTime,
            screen1Played: screen1Played,
            getPlayedStatus: getPlayedStatus,
            screen2Played: screen2Played,
            screen3Played: screen3Played,
            screenResultsPlayed: screenResultsPlayed,
            recordScreenPlayed: recordScreenPlayed,
            scrollToParentTop: scrollToParentTop,

            getAudio: getAudio,
            setAudio: setAudio,
            playAudio: playAudio,
            pauseAudio: pauseAudio,
            stopAudio: stopAudio
        };

        return service;

        function getAudio() {
            return audio;
        }

        function setAudio(newAudio) {
            audio = newAudio;
        }

        function playAudio() {
            if (audio) {
                audio.play();
            }
        }

        function pauseAudio() {
            if (audio) {
                audio.pause();
            }
        }

        function stopAudio() {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        }

        function recordSelectedDisease(disease) {
            return;
        }

        //function recordSelectedDisease(disease) {
        //    dataService.setCurrentUserInformation(disease)
        //        .then(function (result) {
        //            if (result.status === 200) {
        //                userId = result.data;
        //            }
        //        });
        //}

        function recordTagSelection(tags) {
            return;
        }

        //function recordTagSelection(tags) {
        //    var localTags = '';
        //    for (var i = 0; i < tags.length; ++i) {
        //        localTags += tags[i].tagName + '|';
        //    }
        //    selectedTags = localTags;
        //    localTags = '';
        //    //selectedTags = tags;
        //}

        function getUserId() {
            return userId;
        }

        function recordInputScreenActivity(screenName) {

            inputScreens += (screenName + '|');
        }

        function recordResultScreenActivity(screenName) {
            resultScreens += (screenName + '|');
        }

        function clearScreenActivityLog() {
            inputScreens = "";
            resultScreens = "";
            userId = 0;
            contactUsPageCompleted = false;
            contactUsPageReached = false;
        }

        function recordContactPageReachedActivity(booleanValue) {
            contactUsPageReached = booleanValue;
        }

        function recordContactPageCompletedActivity(booleanValue) {
            contactUsPageCompleted = booleanValue;
        }

        function recordScreenName(screenName) {
            actualScreen = screenName;
        }

        function getScreenName() {
            return actualScreen;
        }

        function recordScreenPlayed(screenName, played) {
            switch (screenName) {
                case 'inputs':
                    screen1Played = played;
                    break;
                case 'input2':
                    screen2Played = played;
                    break;
                case 'input3':
                    screen3Played = played;
                    break;
                case 'results':
                    screenResultsPlayed = played;
                    break;
            }
        }

        function getPlayedStatus(screenName) {
            switch (screenName) {
                case 'inputs':
                    return screen1Played;
                case 'input2':
                    return screen2Played;
                case 'input3':
                    return screen3Played;
                case 'results':
                    return screenResultsPlayed;
            }
        }

        function recordUserNavigationStep() {
            selectedDisease = userInputsService.getSelectedDisease();
            if (!userId || !selectedDisease || selectedDisease == null) {
                return;
            }
            var navigationModel = {
                "UserId": userId,
                "SelectedDiseaseId": selectedDisease.id,
                "SelectedTags": selectedTags,
                "InputScreens": inputScreens,
                "ResultScreens": resultScreens,
                "ContactPageReached": contactUsPageReached,
                "ContactPageCompleted": contactUsPageCompleted
            };
            dataService.postUserNavigationInformation(navigationModel)
                .then(function (data) {
                    if (data.status !== 200) {
                        console.log('Failed');
                    }
                });
        }

        function recordApiCallTime(elapsedTime, screenName) {
            var disease = userInputsService.getSelectedDisease();

            var msg = "Time to load page " + screenName + " - " + elapsedTime + " seconds";
            //record time using navigationModel
            var navigationModel = {
                "diseaseID": disease.id,
                "SelectedTags": msg,
                "InputScreens": screenName,
                "ResultScreens": "",
                "ContactPageReached": false,
                "ContactPageCompleted": false
            };

            //use setCurrentUserInformation to create an entry in tblGinNavigationRecord
            dataService.createGinNavigationRecord(navigationModel)
                .error(function (data) {
                    console.log('recordApiCallTime - error occured posting back');
                });
        }

        function scrollToParentTop() {
            if ('parentIFrame' in window) {
                window.parentIFrame.sendMessage('goToTop');
            }
        }
    }
})();
