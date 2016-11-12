var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		id: '',
		productId: '',
		created: '',
		url: ''
	},
	url: function() {
		return this.get('url');
	}
});