/*global angular*/
var i, albumPicasso;

(function () {
    "use strict";
    function CollectionCtrl() {
        this.albums = [];
        for (i = 0; i < 12; i += 1) {
            this.albums.push(angular.copy(albumPicasso));
        }
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
}());
