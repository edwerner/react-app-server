var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		username: '',
		password: '',
		first_name: '',
		last_name: '',
		email: '',
		url: ''
	},
	url: function() {
		return this.get('url');
	}
});