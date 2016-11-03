var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		id: '',
		title: '',
		image: '',
		price: '',
		description: ''
	},
	url: '/product'
});