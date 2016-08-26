(function () {
    'use strict';

    angular
        .module('app.contact')
        .controller('Contact', Contact);

    /* @ngInject */
    function Contact(userInputsService, dataService, userNavigationService) {
        var vm = this;
        vm.title = 'Contact Us';
        userNavigationService.recordScreenName('contact');

        vm.selectedDisease = { id: 0, name: 'Disease Not Selected' };
        if (userInputsService.getSelectedDisease()) {
            vm.selectedDisease = userInputsService.getSelectedDisease();
        }

        vm.hideLanding = false;
        vm.showConfirm = false;

        //vm.subTitle = "We have a limited online information on " + vm.selectedDisease.name + " but please contact us and we will help you find what you need!";

        vm.ginUserId = 0;
      
        vm.source = 'GARD Information Navigator';

        userNavigationService.recordContactPageReachedActivity(true);
        userNavigationService.recordUserNavigationStep();

        dataService.getUserCategories()
            .then(function (data) {
                vm.userCategories = data;
            }).catch(function (error) {
                console.log(error);
            });

        //Referrers
        dataService.getReferrers()
        .then(function (data) {
            vm.referrers = data;
        }).catch(function (error) {
            console.log(error);
        });

        //Countries 
        dataService.getCountries()
          .then(function (data) {
              vm.countries = data;
          }).catch(function (error) {
              console.log(error);
          });

        //States        
        dataService.getStates()
          .then(function (data) {
              vm.states = data;
          }).catch(function (error) {
              console.log(error);
          });

        //ContactedBefore
        dataService.getPreviousContactData()
        .then(function (data) {
            vm.ContactedBeforeData = data;
        }).catch(function (error) {
            console.log(error);
        });

        vm.ChangeUserCategory = function () {
            vm.selectedUserCategory = vm.categoryModel.userCategoryCodeID;
        };

        vm.ChangeReferrer = function () {
            vm.selectedReferrer = vm.referrenceModel.referrerCodeID;
        };

        vm.ChangeCountry = function () {
            vm.selectedCountry = vm.countryModel.countryID;
        };

        vm.ChangeState = function () {
            vm.selectedState = vm.stateModel.stateID;
        };

        vm.selectedDiseaseName = vm.selectedDisease.name;

        vm.Confirm = function () {
            userNavigationService.recordContactPageCompletedActivity(true);
            userNavigationService.recordUserNavigationStep();
            vm.hideLanding = true;
            vm.showConfirm = true;
            return true;
        };

        vm.AddContact = function () {
            if (vm) {
                if (userNavigationService.getUserId() > 0) {
                    vm.ginUserId = userNavigationService.getUserId();
                }

                var inquiryModel = {
                    "FirstName": vm.firstName,
                    "LastName": vm.lastName,
                    "Email": vm.email,
                    "Subject": vm.selectedDiseaseName,
                    "Question": vm.question,
                    "UserCategoryID": vm.selectedUserCategory,
                    "ReferrerID": vm.selectedReferrer,
                    "StateID": vm.selectedState,
                    "CountryID": vm.selectedCountry,
                    "ContactedBeforeBool": vm.ContactedBefore,
                    "Source": vm.source,
                    "GinUserID": vm.ginUserId
                };

                console.log(inquiryModel);
                dataService.postInquiryData(inquiryModel)
                .then(function (data) {
                    if (data.status === 200) {
                        vm.Confirm();
                    }
                });
                userNavigationService.scrollToParentTop();
            }
        };

        vm.startOver = function () {
            userNavigationService.recordInputScreenActivity('start-over');
            userNavigationService.recordUserNavigationStep();
            userInputsService.clearSelectedTags();
            userNavigationService.clearScreenActivityLog();
            //$state.go(vm.getBackPath);
        };

        vm.clickBack = function () {
            userNavigationService.recordInputScreenActivity("results");
            userNavigationService.recordUserNavigationStep();
        };
        
        vm.close = function () {
            if ('parentIFrame' in window) {
                window.parentIFrame.sendMessage('close');
            }
        };
    }

})();