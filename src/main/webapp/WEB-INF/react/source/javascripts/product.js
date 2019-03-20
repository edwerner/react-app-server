var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		id: '',
		year: '',
		rating: '',
		title: '',
		author: '',
		imageUrl: ''
	},
	url: '/product'
});