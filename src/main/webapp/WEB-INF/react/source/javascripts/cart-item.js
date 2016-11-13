var Backbone = require('backbone');
// var CartItems = require('./cart-items');

module.exports = Backbone.Model.extend({
	defaults: {
		productId: '',
		url: ''
	},
	url: function() {
		return this.get('url');
	}	
	// parse : function(response) {
	//   	response.map(function(cartItem, id) {
	//   		CartItems.add(cartItem);
	//   	});
 //  		return cartItems;
 //  	}
});