var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		id: '',
		title: '',
		subtitle: '',
		author: '',
		isbn: '',
		publishDate: '',
		language: '',
		image: '',
		price: '',
		description: '',
		genre: '',
		pageCount: '',
		publisher: ''
	},
	url: '/product'
});