/*global angular*/
var i, albumPicasso;

(function () {
    "use strict";

    function CollectionCtrl(Fixtures) { // inject our custom Fixtures service
        this.albums = Fixtures.getCollection(12); // numberOfAlbums = 12
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
}());
