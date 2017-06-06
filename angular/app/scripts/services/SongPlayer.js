// Create service using factory style declaration to produce instance of SongPlayer.
// Method:                  SongPlayer
// Private attributes:      currentAlbum, currentBuzzObject
// Private functions:       setSong, playSong
// Public attributes:       SongPlayer.currentSong
// Public methods:          SongPlayer.play, SongPlayer.pause

/*global angular*/
/*global buzz*/

var SongPlayer,
    currentAlbum,
    currentBuzzObject,
    setSong,
    playSong,
    getSongIndex,
    currentSongIndex,
    song;

(function () {
    'use strict';
    function SongPlayer(Fixtures) {

        SongPlayer = {};
        /**
        * @desc current album placeholder (private attribute)
        * @type {Object}
        */
        currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Buzz object audio file (private attribute)
        * @type {Object}
        */
        currentBuzzObject = null;

        /**
        * @function setSong (private function)
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        setSong = function (song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null; // song.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            SongPlayer.currentSong = song;
        };

        /**
        * @function playSong (private function)
        * @desc Sets playing boolean to true and plays current song.
        * @param {Object} song
        */
        playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
        * @function getSongIndex (private function)
        * @desc identifies album song based on index.
        * @param {Object} song
        */
        getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
        * @desc holds current song, or is null (public attribute)
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @function play method (public function)
        * @desc Plays music by leveraging private setSong and playSong methods.
        * @type {Object}
        */
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
        * @function pause method (public function)
        * @desc Pauses music.
        * @type {Object}
        */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function previous method (public function)
        * @desc indexes back a song.
        * @type {Object}
        */
        SongPlayer.previous = function () {
            currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex -= 1;
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
}());
