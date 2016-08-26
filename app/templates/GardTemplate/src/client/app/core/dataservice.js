(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService);

    /* @ngInject */
    function dataService($http, $q, config) {

        var webApiUrl = config.webApiUrl;

        var service = {
            getAllDiseases: getAllDiseases,
            getDiseaseById: getDiseaseById,
            getDiseaseDefaultQuestion: getDiseaseDefaultQuestion,
            getAllTags: getAllTags,
            getDiseaseInformationTags: getDiseaseInformationTags,
            getLivingWithTags: getLivingWithTags,
            getDiseaseTagCards: getDiseaseTagCards,
            getDiseaseTagsWithContent: getDiseaseTagsWithContent,
            getUserCategories: getUserCategories,
            getReferrers: getReferrers,
            getCountries: getCountries,
            getStates: getStates,
            getPreviousContactData: getPreviousContactData,
            postInquiryData: postInquiryData,
            setCurrentUserInformation: setCurrentUserInformation,
            postUserNavigationInformation: postUserNavigationInformation,
            createGinNavigationRecord: createGinNavigationRecord,
            getIP: getIP,
            reportError: reportError
        };

        return service;

        function getAllDiseases() {
            return $http.get(webApiUrl + 'api/tags/diseases')
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving all diseases: ' + error);
                });
        }

        function getDiseaseById(diseaseId) {
            return $http.get(webApiUrl + 'api/tags/disease/' + diseaseId)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving all diseases: ' + error);
                });
        }

        function getDiseaseDefaultQuestion(diseaseId) {
            return $http.get(webApiUrl + 'api/tags/disease/defaultquestion/' + diseaseId)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving disease default question: ' + error);
                });
        }

        function getAllTags() {
            return $http.get(webApiUrl + '/api/tags')
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving all tags: ' + error);
                });
        }

        function getDiseaseInformationTags() {
            return getAllTags()
                .then(function (allTags) {
                    return filterTagsByType(allTags, 'Disease Information');
                })
                .catch(function (error) {
                    return $q.reject(error);
                });

            //function filterDiseaseInformationTags(allTags) {
            //    var knowMoreTags = _(allTags).filter(function (item) {
            //        return item.tag.tagName === 'Disease Information';
            //    }).value();
            //
            //    knowMoreTags = _.map((_.first(knowMoreTags).childTags), function (item) {
            //        return {tagId: item.tag.tagId, tagName: item.tag.tagName};
            //    });
            //    return knowMoreTags;
            //}
        }

        function getLivingWithTags() {
            return getAllTags()
                .then(function (allTags) {
                    return filterTagsByType(allTags, 'Living With');
                })
                .catch(function (error) {
                    return $q.reject(error);
                });
        }

        function filterTagsByType(allTags, tagType) {
            var filteredTags = _(allTags).filter(function (item) {
                return item.tag.tagName === tagType;
            }).value();

            filteredTags = _.map((_.first(filteredTags).childTags), function (item) {
                var tagOrder = item.tag.tagOrder;
                if (tagType === 'Living With') {
                    tagOrder = tagOrder + 100;
                }

                //console.log(item.tag.audioFilePath);
                return {tagId: item.tag.tagId, tagName: item.tag.tagName, tagOrder: tagOrder, tagAudio: item.tag.audioFilePath};
            });
            return filteredTags;
        }

        function getDiseaseTagCards(diseaseId, tagId) {
            var urlEndPoint = webApiUrl + '/api/tags/' + diseaseId + '/' + tagId;
            return $http.get(urlEndPoint)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving cards: ' + error);
                });
        }

        function getDiseaseTagsWithContent(diseaseId, tagIds) {
            if (tagIds.length > 0) {
                var urlEndPoint = webApiUrl + '/api/tags/' + diseaseId + '/findcontenttags?';

                //tagIds=2&tagIds=5&tagIds=3&
                tagIds.forEach(function (element, index, array) {
                    urlEndPoint += 'tagIds=' + element + '&';
                });

                return $http.get(urlEndPoint)
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (error) {
                        return $q.reject('Error occured while retrieving cards: ' + error);
                    });
            }
            else {
                return [];
            }
        }

        function getUserCategories() {
            var urlEndPoint = webApiUrl + '/api/tags/lookup/categories';
            return $http.get(urlEndPoint)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving user categories: ' + error);
                });
        }

        function getReferrers() {
            var urlEndPoint = webApiUrl + '/api/tags/lookup/referrers';
            return $http.get(urlEndPoint)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving the referrers ' + error);
                });
        }

        function getCountries() {
            var urlEndPoint = webApiUrl + '/api/tags/lookup/countries';
            return $http.get(urlEndPoint)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving the countries ' + error);
                });
        }

        function getStates() {
            var urlEndPoint = webApiUrl + '/api/tags/lookup/states';
            return $http.get(urlEndPoint)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving the states ' + error);
                });
        }

        function getPreviousContactData() {
            var urlEndPoint = webApiUrl + 'api/tags/lookup/contactedBefore';
            return $http.get(urlEndPoint)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving Contacted Before Data ' + error);
                });
        }

        function postInquiryData(inquiry) {
            var urlEndPoint = webApiUrl + 'api/tags/newInquiry/AddInquiry';
            return $http.post(urlEndPoint, inquiry).
                success(function (data, status, headers, config) {
                    console.log('success');
                }).
                error(function (data, status, headers, config) {
                    console.log('error');
                });
        }

        function setCurrentUserInformation(selectedDisease) {
            var urlEndPoint = webApiUrl + 'api/tags/newUser/createUserNavigation';
            return $http.post(urlEndPoint, selectedDisease).
                success(function (data) {
                    return data;
                }).
                error(function (data) {
                    console.log('error');
                });
        }

        function postUserNavigationInformation(navigationModel) {
            var urlEndPoint = webApiUrl + 'api/tags/existingUser/UpdateUserNavigation';
            return $http.post(urlEndPoint, navigationModel).
                success(function (data) {
                    return data;
                }).
                error(function (data) {
                    console.log('error');
                });
        }

        function createGinNavigationRecord(navigationModel){
            var urlEndPoint = webApiUrl + 'api/tags/createGinNavigationRecord';
            return $http.post(urlEndPoint, navigationModel);
        }

        function getIP() {
            var urlEndPoint = 'https://api.ipify.org?format=json';
            return $http.get(urlEndPoint)
                .then(getIPComplete)
                .catch(function (error) {
                    return $q.reject('Error occured while retrieving Contacted Before Data ' + error);
                });

            function getIPComplete(data, status, headers, config) {
                return data;
            }
        }

        function reportError(error) {
            if (webApiUrl.indexOf('localhost') > 0) {
                console.log('Not sending email from localhost');
                return; //localhost can't send out email
            }

            var urlEndPoint = webApiUrl + 'api/tags/reportError';
            return $http.post(urlEndPoint, error).
                success(function (data) {
                    return data;
                }).
                error(function (data) {
                    console.log('error');
                });
        }
    }

})();
