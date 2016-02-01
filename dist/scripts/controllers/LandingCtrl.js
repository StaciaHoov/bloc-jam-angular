(function() {
	function LandingCtrl() {
		this.heroTitle = "Turn the Music Up!"; //'this' adds heroTitle property to LandingCtrl's $scope object
	}
	angular
		.module('blocJams')
		.controller('LandingCtrl', LandingCtrl);
})();