/*global angular*/

var seconds,
    wholeSeconds,
    minutes,
    remainingSeconds,
    output;

(function () {
    'use strict';
    function timecode() {
        return function (seconds) {

            seconds = Number.parseFloat(seconds);

            if (Number.isNaN(seconds)) {
                return '-:--';
            }

            wholeSeconds = Math.floor(seconds);
            minutes = Math.floor(wholeSeconds / 60);
            remainingSeconds = wholeSeconds % 60;

            output = minutes + ':';

            if (remainingSeconds < 10) {
                output += '0';
            }

            output += remainingSeconds;

            return output;
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', timecode);
}());
