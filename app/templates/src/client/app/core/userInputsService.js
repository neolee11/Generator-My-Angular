(function () {
    'use strict';

    angular.module('app.core')
        .factory('userInputsService', userInputsService);

    /* @ngInject */
    function userInputsService() {
        var allDiseases;
        var selectedDisease;

        var allDiseaseInformationTags;
        var allLivingWithTags;
        var selectedTags = [];
        var undiagnosedDisease = { id: 12037, name: 'Undiagnosed condition' };
        var lastInputPath = null;

        var service = {
            getAllDiseases: getAllDiseases,
            setAllDiseases: setAllDiseases,

            getSelectedDisease: getSelectedDisease,
            setSelectedDisease: setSelectedDisease,

            getUndiagnosedDisease: getUndiagnosedDisease,
            undiagosedDiseaseSelected: undiagosedDiseaseSelected,

            getLastInputPath: getLastInputPath,
            setLastInputPath: setLastInputPath,

            getAllDiseaseInformationTags: getAllDiseaseInformationTags,
            setAllDiseaseInformationTags: setAllDiseaseInformationTags,

            getAllLivingWithTags: getAllLivingWithTags,
            setAllLivingWithTags: setAllLivingWithTags,

            getSelectedTags: getSelectedTags,
            setSelectedTags: setSelectedTags,
            addSelectedTag: addSelectedTag,
            removeSelectedTag: removeSelectedTag,
            clearSelectedTags: clearSelectedTags,

            clearUserInputs: clearUserInputs
        };

        function getAllDiseases() {
            return allDiseases;
        }

        function setAllDiseases(diseases) {
            allDiseases = diseases;
        }

        function getSelectedDisease() {
            return selectedDisease;
        }

        function setSelectedDisease(disease) {
            selectedDisease = disease;
        }

        function getUndiagnosedDisease() {
            return undiagnosedDisease;
        }

        function undiagosedDiseaseSelected() {
            return !!(selectedDisease && selectedDisease.id === undiagnosedDisease.id);
        }

        function getLastInputPath() {
            return lastInputPath;
        }

        function setLastInputPath(inputPath) {
            lastInputPath = inputPath;
        }

        function getAllDiseaseInformationTags() {
            return allDiseaseInformationTags;
        }

        function setAllDiseaseInformationTags(tags) {
            allDiseaseInformationTags = tags;
        }

        function getAllLivingWithTags() {
            return allLivingWithTags;
        }

        function setAllLivingWithTags(tags) {
            allLivingWithTags = tags;
        }

        function getSelectedTags() {
            return selectedTags;
        }

        function setSelectedTags(tags) {
            selectedTags = tags;
        }

        function addSelectedTag(tag) {
            var index = _.findIndex(selectedTags, function (tagInArray) {
                return tagInArray.tagId === tag.tagId;
            });

            if (index < 0) {
                selectedTags.push(tag);
                selectedTags = _.sortBy(selectedTags, 'tagOrder');
            }
        }

        function removeSelectedTag(tag) {
            var index = _.findIndex(selectedTags, function (tagInArray) {
                return tagInArray.tagId === tag.tagId;
            });

            if (index >= 0) {
                selectedTags.splice(index, 1);
            }
        }

        function clearSelectedTags() {
            selectedTags = [];
        }

        return service;

        function addSelectedTagDeprecated(tag) {

            if (selectedTags.length > 0) {
                if (getTagType(selectedTags[0]) === getTagType(tag)) {
                    selectedTags.push(tag);
                    selectedTags = _.sortBy(selectedTags, 'tagOrder');
                }
                else {
                    selectedTags = [];
                    selectedTags.push(tag);
                }
            }
            else {
                selectedTags.push(tag);
            }
        }

        function getTagType(tag) {
            var index = _.findIndex(allDiseaseInformationTags, function (disTag) {
                return disTag.tagId === tag.tagId;
            });

            if (index >= 0) {
                return 'Disease Information';
            }
            else {
                return 'Living With';
            }
        }

        function clearUserInputs() {
            selectedDisease = null;
            clearSelectedTags();
            lastInputPath = null;
        }
    }
})();