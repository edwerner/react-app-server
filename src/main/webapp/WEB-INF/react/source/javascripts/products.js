var Backbone = require('backbone');
var Product = require('./product');
var _ = require('underscore');

module.exports = Backbone.Collection.extend({
	url: '/shop',
	model: Product
  // parse : function(response) {
  // 	_.each(response, function(res, id) {
  // 		res.id = res._id;
  // 		delete res._id;
  // 	});
  // 	return response;
  // }
});