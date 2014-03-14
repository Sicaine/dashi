'use strict';

angular.module('Library', []).
    directive('widget', function() {

        console.log('widget global');
        return {

            restrict: 'A',

            link: function(scope, element, $linkAttributes) {

                element.bind('click', function(event) {
                    alert('clicked in widget');
                    event.stopPropagation();
                });

                var innerObj = angular.element('<span class="name">I\'m a widget</span>');
                element.append(innerObj);

                element.addClass('widget');
                element.css('top', event.offsetY);
                element.css('left', event.offsetX);
                element.css('width', 300);
                element.css('height', 100);

                scope.$apply();

                console.log('widget link');

            }
        }
    });