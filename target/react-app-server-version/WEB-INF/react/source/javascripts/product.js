var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		id: '',
		name: '',
		price: '',
		description: '',
		quantity: ''
	},
	url: '/product'
});