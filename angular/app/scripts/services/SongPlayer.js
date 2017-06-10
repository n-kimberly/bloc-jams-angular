// Create service using factory style declaration to produce instance of SongPlayer.
// Method:                  SongPlayer
// Private attributes:      currentAlbum, currentBuzzObject
// Private functions:       setSong, playSong
// Public attributes:       SongPlayer.currentSong
// Public methods:          SongPlayer.play, SongPlayer.pause, SongPlayer.previous, SongPlayer.next

/*global angular*/
/*global buzz*/

var SongPlayer,
    currentAlbum,
    currentBuzzObject,
    setSong,
    playSong,
    getSongIndex,
    stopSong,
    currentSongIndex,
    song;

(function () {
    'use strict';
    function SongPlayer($rootScope, Fixtures) {

        SongPlayer = {};

        /**
        * @desc current album placeholder (private attribute)
        * @type {Object}
        */
        currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Bbzz object audio file (private attribute)
        * @type {Object}
        */
        currentBuzzObject = null;

        /**
        * @function setSong (private function)
        * @desc stops currently playing song and loads new audio file
        * @param {Object} song
        */
        setSong = function (song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function () {
                $rootScope.$apply(function () {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
        };

        /**
        * @function playSong (private function)
        * @desc sets playing boolean to true and plays current song
        * @param {Object} song
        */
        playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
        * @function getSongIndex (private function)
        * @desc identifies album song based on index
        * @param {Object} song
        */
        getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
        * @function stopSong (private function)
        * @desc stops song and sets song.playing to null
        * @param {Object} song
        */
        stopSong = function (song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

        /**
        * @desc holds current song, or is null (public attribute)
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        * @function play (public function)
        * @desc plays music by leveraging private setSong and playSong methods.
        * @type {Object} song
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
        * @function pause (public function)
        * @desc pauses music
        * @type {Object} song
        */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function previous (public function)
        * @desc indexes back a song
        * @type {Object}
        */
        SongPlayer.previous = function () {
            currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex -= 1;
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function next (public function)
        * @desc indexes forward a song
        * @type {Object}
        */
        SongPlayer.next = function () {
            currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex += 1;
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function (time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
}());
