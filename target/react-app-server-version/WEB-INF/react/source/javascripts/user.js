var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		password: '',
		email: ''
	},
	url: '/signup'
});