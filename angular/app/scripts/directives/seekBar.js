/*global angular*/
/*global $*/

var calculatePercent,
    offsetX,
    seekBarWidth,
    offsetXPercent,
    percentString,
    value,
    max,
    percent;

(function () {
    'use strict';
    function seekBar($document) {

        calculatePercent = function (seekBar, event) {
            offsetX = event.pageX - seekBar.offset().left;
            seekBarWidth = seekBar.width();
            offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function (scope, element) {
                scope.value = 0;
                scope.max = 100;

                seekBar = $(element);

                percentString = function () {
                    value = scope.value;
                    max = scope.max;
                    percent = (value / max) * 100;
                    return percent + '%';
                };

                scope.fillStyle = function () {
                    return {width: percentString()};
                };

                scope.onClickSeekBar = function (event) {
                    percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };

                scope.trackThumb = function () {
                    $document.bind('mousemove.thumb', function (event) {
                        percent = calculatePercent(seekBar, event);
                        scope.$apply(function () {
                            scope.value = percent * scope.max;
                        });
                    });
                    $document.bind('mouseup.thumb', function () {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
}());
