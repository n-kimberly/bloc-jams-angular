/*global angular*/
var albumPicasso;

(function () {
    "use strict";
    function AlbumCtrl(Fixtures, SongPlayer) {  // We also want songPlayer on album view
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]); // define dependencies.
}());
