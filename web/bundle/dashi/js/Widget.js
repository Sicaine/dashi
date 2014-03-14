'use strict';

angular.module('Library', []).
    directive('widget', function($document) {

        console.log('widget global');
        return {

            restrict: 'A',

            link: function(scope, element, $attrs) {
                scope.startX = scope.offsetX = $attrs.offsetX;
                scope.startY = scope.offsetY = $attrs.offsetY;

                if(angular.isString($attrs.widgetId)){
                    scope.widgetId = $attrs.widgetId;
                    element.addClass('saved');
                } else {
                    element.addClass('widget');

                    element.css('top', scope.offsetY);
                    element.css('left', scope.offsetX);
                    element.css('width', 300);
                    element.css('height', 100);
                }



                element.find('.name').bind('click', function(event) {
                    alert('clicked in widget');
                    event.stopPropagation();
                });

                element.find('.closeX').bind('click', function(event) {
                    scope.$destroy();
                    element.remove();
                    event.stopPropagation();
                });




                console.log('widget link');

                element.find('.dragbar').on('mousedown', function(event) {
                    var xElement = element.find('.closeX');
                    if(xElement[0] == event.target[0]){
                        return;
                    }

                    console.log('start dragging');
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    scope.startX = event.pageX - scope.offsetX;
                    scope.startY = event.pageY - scope.offsetY;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                    event.stopPropagation();
                });

                function mousemove(event) {
                    element.removeClass('saved');
                    scope.offsetY = event.pageY - scope.startY;
                    scope.offsetX = event.pageX - scope.startX;
                    element.css({
                        top: scope.offsetY + 'px',
                        left:  scope.offsetX + 'px'
                    });

                    console.log('dragging');

                    event.stopPropagation();
                }

                function mouseup(event) {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);

                    console.log('end dragging');
                    event.stopPropagation();
                }

            },

            templateUrl: '/bundle/dashi/template/widget.html'
        }
    });