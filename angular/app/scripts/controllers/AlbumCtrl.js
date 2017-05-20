/*global angular*/
var albumPicasso;

(function () {
    "use strict";
    function AlbumCtrl(Fixtures) {  // inject our custom Fixtures service
        this.albumData = Fixtures.getAlbum(); // access getAlbum() method
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]); // define as dependency
}());
