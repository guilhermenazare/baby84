angular.module('app')
       .directive('navbar', navbar);
       
function navbar() {
    var directive = {
        link: link,
        templateUrl: 'components/navbar/navbar.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        
    }
}