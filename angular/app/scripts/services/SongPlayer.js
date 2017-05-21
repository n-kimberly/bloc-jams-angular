// Create service using factory style declaration to produce instance of SongPlayer.

// Private attributes:      currentSong, currentBuzzObject
// Private functions:       setSong, playSong
// Public attributes:
// Public methods:          SongPlayer.play, SongPlayer.pause

/*global angular*/
/*global buzz*/

var SongPlayer,
    currentSong,
    currentBuzzObject,
    setSong,
    playSong;

(function () {
    'use strict';
    function SongPlayer() {
        SongPlayer = {};

        /**
        * @desc holds current song, or is null
        * @type {Object}
        */
        currentSong = null;
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        setSong = function (song) {
            // if a song was defined before, set it now to null
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                song.playing = null;
            }
            // Otherwise, set it to the new song
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            currentSong = song;
        };

        /**
        * @function playSong
        * @desc Sets playing boolean to true and plays current song.
        * @param {Object} song
        */
        playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        SongPlayer.play = function (song) {
            // If there is a song playing that isn't the one clicked on, pause it
            // Then set new song as current song and play it.
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            // If the song clicked on was paused, play it
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        // Pause song
        SongPlayer.pause = function (song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
}());
