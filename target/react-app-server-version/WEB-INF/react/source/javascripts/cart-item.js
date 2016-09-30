var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		product_id: '',
		quantity: 0
	},
	url: '/cart'
});