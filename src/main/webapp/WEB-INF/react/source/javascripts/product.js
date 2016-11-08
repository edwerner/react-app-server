var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		id: '',
		title: '',
		author: '',
		isbn: '',
		publishdate: '',
		language: '',
		image: '',
		price: '',
		description: '',
		genre: ''
	},
	url: '/product'
});