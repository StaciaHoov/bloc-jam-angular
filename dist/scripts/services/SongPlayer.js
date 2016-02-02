(function() {
	function SongPlayer() {
		var SongPlayer = {};
		var currentSong = null;
		
	/**
	* @desc Buzz object audio File* @type {Object}
	*/
		var currentBuzzObject = null;
		
	/**
	* @function setSong
	* @desc Stops currently playing song and loads new audio file as CurrentBuzzObject
	* @param {Object} song
	*/
		var setSong = function(song) {
			if (currentBuzzObject) {
					currentBuzzObject.stop();
					currentSong.playing = null;
			} 
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			currentSong = song;
		};

	/**
	* @function playSong
	* @desc Plays the current audio file and sets the song object to playing
	*/		
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;	
		};
	
	/**
	* @function SongPlayer.play
	* @desc Checks if the current song is the song chosen. If its not, it sets and plays the new song (see setSong & playSong above). If the selected song is the current playing song, it checks if the audio file is paused and if it is, plays it (see playSong).
	* @param {Object} song
	*/	
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong();
				}
			}
		};
	
	/**
	* @function SongPlayer.pause
	* @desc Pauses the current song and sets the playing parameter of song to false.
	* @param {Object} song
	*/		
		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();