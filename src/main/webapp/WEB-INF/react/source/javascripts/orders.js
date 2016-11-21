var Backbone = require('backbone');
var Order = require('./order');

module.exports = Backbone.Collection.extend({
	url: '/orders',
	model: Order
});