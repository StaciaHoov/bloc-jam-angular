(function() {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
			enabled: true, //hashbang, Angular prefix to routes, disabled.
			requireBase: false //so a base tag not required 
		});
		
		$stateProvider
			.state('landing', {
				url: '/',
				controller: 'LandingCtrl as landing',
				templateUrl: '/templates/landing.html' //the ui-view directive in index.html loads the landing state
		})
			.state('album', {
				url: '/album',
				templateUrl: '/templates/album.html' // when localhost:3000/album ui-view loads the album template
		})
			.state('collection', {
				url: '/collection',
				controller: 'CollectionCtrl as collection',
				templateUrl: '/templates/collection.html'
		});
		
		angular
			module('blocJams', ['ui.router'])
			.config(config);
})();
