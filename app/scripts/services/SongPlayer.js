(function() {
	function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};
/**
* @function currentAlbum
* @desc Gets all the album information from the Fixtures service
*/	
		var currentAlbum = Fixtures.getAlbum();
		
/**
* @desc Buzz object audio File
* @type {Object}
*/
		var currentBuzzObject = null;
	
/**
* @function getSongIndex
* @desc Get the index of a song
* @type {Object}
*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);	
		};

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as CurrentBuzzObject
* @param {Object} song
*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} 
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
/* Buzz's bind() method adds event listeners to a sound. Runs callback after timeupdate(Buzz html5 audio event) event.
$rootScope.$apply allows the  update of the song's playback progress from anywhere.*/
			currentBuzzObject.bind('timeupdate', function() { 
				$rootScope.$apply(function() { 
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});
			SongPlayer.currentSong = song;
		};
		

/**
* @function playSong
* @desc Plays the current audio file and sets the song object to playing
* @param {Object} song
*/		
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;	
		};
/**
* @function stopSong
* @desc Stops the current audio file and sets the song object to null
* @param {Object} song
*/			
		var stopSong = function(song) {
			currentBuzzObject.stop();
			song.playing = null;
		};
		
/**
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song. Checks for Buzz object and then uses Buzz's setTime method to * set playback position.
* @param {Number} time
*/		
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};		
		
		SongPlayer.setVolume = function(volume) {
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(volume);
			}
		};
/**
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
		SongPlayer.currentTime = null;
		
		SongPlayer.currentVolume = 0;
		
		SongPlayer.currentSong = null;
		
/**
* @function SongPlayer.play
* @desc Checks if the current song is the song chosen. If its not, it sets and plays the new song (see setSong & playSong above). If the selected song is the current playing song, it checks if the audio file is paused and if it is, plays it (see playSong).
* @param {Object} song
*/	
		SongPlayer.play = function(song) {
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
* @function SongPlayer.pause
* @desc Pauses the current song and sets the playing parameter of song to false.
* @param {Object} song
*/		
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
/**
* @function SongPlayer.previous
* @desc Gets the index of the song before the currently playing song. If song is first in album (index=0), stop audio file and set currentSong to not playing (null). If index >0, set and play the song associated with currentSongIndex.
*/
	
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

/**		
* @function SongPlayer.next
* @desc Gets the index of and plays the song coming after the currently playing song. If song is last in album (index=length-1), stop audio file and set currentSong to not playing (null). 
*/		
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
			if (currentSongIndex > (songs.length - 1)) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}			
		};
		
		return SongPlayer;
	};

	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
		
})();