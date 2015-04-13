'use strict';

app.controller('startProcessIndexCtrl', ['$scope', function ($scope) {

    var today = new Date();
    $scope.tabs = { title: ['Asbestos', 'Basic Info', 'Dates', 'Fall Questions', 'Job Questions', 'Training & Misc', 'Additional Comments', 'Summary'] };
    $scope.addingQuestion = false;
    $scope.people = ['Christina', 'Beth', 'Jeff'];
    $scope.newQuestions = [];
    today.toLocaleDateString();
    $scope.values = { date: today, addingQuestionTitle:[] };
    $scope.page = { first: true, second: false, third: false, fourth: false, five: false, six: false, seven: false, eight: false };
    $scope.YesOrNo = [{ ID: 1, Word: 'Yes' }, { ID: 2, Word: 'No' }];
    $scope.typeOfBuilding = [{ ID: 1, Word: 'Public' }, { ID: 2, Word: 'Private' }];
    $scope.roofAccess = [{ ID: 1, Word: 'Internal Hatch' }, { ID: 2, Word: 'Exterior Ladder' }, { ID: 3, Word: 'Stairway' }, { ID: 4, Word: 'Elevator' }];
    $scope.project = [{ ID: 1, Word: 'Renovation' }, { ID: 2, Word: 'New Construction' }];
    $scope.protectionUsed = [{ ID: 1, Word: '100% tie off' }, { ID: 2, Word: 'Guardrail System' }, { ID: 3, Word: 'Warning Line System' }, { ID: 4, Word: 'Safety Monitor' }];
    $scope.guardRails = [{ ID: 1, Word: 'Side Mounts' }, { ID: 2, Word: 'Top Mounts' }, { ID: 3, Word: 'Parapet Wall' }];
    $scope.guardRailsProtection = [{ ID: 1, Word: 'Fall Protection' }, { ID: 2, Word: 'Fall Restraint' }];
    $scope.conditionNailer = [{ ID: 1, Word: 'Good Condition' }, { ID: 2, Word: 'Decent Condition' }, { ID: 3, Word: 'Poor Condition' }, { ID: 4, Word: 'Needs to be replaced' }];
    $scope.skylights = [{ ID: 1, Word: 'Removed and Covered' }, { ID: 2, Word: 'Covered in place' }, { ID: 3, Word: 'Flagged at 6 ft' }];
    $scope.pitchOfRoof = [{ ID: 1, Word: 'Low Slope: <= 4 in 12' }, { ID: 2, Word: 'Steep Slope: > 4 in 12' }];

    $scope.proceed = function (asbestosProject, isReasonEntered, reasonText) {
        if (asbestosProject === true) {
            if (isReasonEntered !== undefined) {
                if (isReasonEntered === 2) {
                    if (reasonText === "" || reasonText === undefined) {
                        alert("Must enter a reason for not having Inspection");
                    }
                    else { $scope.page.second = true; $scope.page.first = false; }
                }
                else { $scope.page.second = true; $scope.page.first = false; }
            }
            else { alert("You must select if an inspection has taken place") }
        } else { $scope.page.second = true; $scope.page.first = false; }
    };
        
    $scope.addToPage = function (title) {
        $scope.newQuestions.push(title);
        $scope.values.addingQuestionTitle = undefined;
        $scope.addingQuestion = false;
    };
        
    $scope.tab = function (value) {
        switch (value) {
            case 'one': $scope.page.second = false; $scope.page.first = true; $scope.page.third = false; $scope.page.fourth = false; $scope.page.five = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'two': $scope.page.first = false; $scope.page.second = true; $scope.page.third = false; $scope.page.fourth = false; $scope.page.five = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'three': $scope.page.first = false; $scope.page.second = false; $scope.page.third = true; $scope.page.fourth = false; $scope.page.five = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'four': $scope.page.fourth = true; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false; $scope.page.five = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'five': $scope.page.five = true; $scope.page.fourth = false; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false; $scope.page.six = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'six': $scope.page.six = true; $scope.page.five = false; $scope.page.fourth = false; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false; $scope.page.seven = false; $scope.page.eight = false;
                break;
            case 'seven': $scope.page.seven = true; $scope.page.six = false; $scope.page.five = false; $scope.page.fourth = false; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false; $scope.page.eight = false;
                break;
            case 'eight': $scope.page.eight = true; $scope.page.seven = false; $scope.page.six = false; $scope.page.five = false; $scope.page.fourth = false; $scope.page.first = false; $scope.page.second = false; $scope.page.third = false;
                break;

        }
    }
    init();

    function init() {

    }

}]);

