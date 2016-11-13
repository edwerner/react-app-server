var Backbone = require('backbone');
// var CartItemCollection = require('./cart-items');

module.exports = Backbone.Model.extend({
	defaults: {
		id: ''
		// cartItemList: new CartItemCollection()
	},
	url: '/cart'
});