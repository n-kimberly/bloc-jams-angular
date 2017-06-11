/*global angular*/

var calculatePercent,
    offsetX,
    seekBarWidth,
    offsetXPercent;

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
            scope: {
                onChange: '&'
            },
            link: function (scope, element, attributes) {

                var seekBar,
                    percentString,
                    value,
                    max,
                    percent,
                    notifyOnChange;

                scope.value = 0;
                scope.max = 100;

                seekBar = $(element);

                attributes.$observe('value', function (newValue) {
                    scope.value = newValue;
                });

                attributes.$observe('max', function (newValue) {
                    scope.max = newValue;
                });

                percentString = function () {
                    value = scope.value;
                    max = scope.max;
                    percent = value / max * 100;
                    return percent + '%';
                };

                scope.fillStyle = function () {
                    return {width: percentString()};
                };

                scope.thumbStyle = function () {
                    return {left: percentString()};
                };

                scope.onClickSeekBar = function (event) {
                    percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };

                scope.trackThumb = function () {
                    $document.bind('mousemove.thumb', function (event) {
                        percent = calculatePercent(seekBar, event);
                        scope.$apply(function () {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });
                    $document.bind('mouseup.thumb', function () {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };

                notifyOnChange = function (newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
            }
        };
    }
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
}());
