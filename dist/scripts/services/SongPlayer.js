(function() {
	function SongPlayer() {
		var SongPlayer = {};
		
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
					SongPlayer.currentSong.playing = null;
			} 
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			SongPlayer.currentSong = song;
		};
		

	/**
	* @function playSong
	* @desc Plays the current audio file and sets the song object to playing
	*/		
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;	
		};
		
	
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
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();