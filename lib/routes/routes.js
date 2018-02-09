Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	// Jokes
	this.route('diary', {
		path: '/diary',
		template: 'diary'
	});

	// Login
	this.route('login', {
		path: '/',
		template: 'login'
	});

	// Signup
	this.route('signup', {
		path: '/signup',
		template: 'signup'
	});

	// write
	this.route('entryForm', {
		path: '/entryForm',
		template: 'entryForm'
	});

	// write
	this.route('private', {
		path: '/private',
		template: 'private'
	});

});
