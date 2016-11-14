var Backbone = require('backbone');
var CartItem = require('./cart-item');

module.exports = Backbone.Collection.extend({
	model: CartItem,
	url: '/cartitems'
});