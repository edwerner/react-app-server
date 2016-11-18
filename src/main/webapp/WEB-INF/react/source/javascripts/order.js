var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		id: '',
		accountId: '',
		created: '',
		productList: ''
	},
	url: '/order'
});