var React = require('react');
var CartAddWidget = require('./cart-add-widget.jsx');
var CartItem = require('../javascripts/cart-item');

module.exports = React.createClass({
	render: function() {
		return(			
     	<div className='product__tile flex flex-space-between flex-column'>
     		<img className='product__image' src={this.props.product.get('image')}/>
      	<div className='product__title'>{this.props.product.get('name')}</div>
        <a href='javascript:void(0)' className='product__description__toggle'>Show</a>
      	<div className='product__description'>{this.truncateString(25, this.props.product.get('description'))}</div>
      	<div className='product__price'>${this.props.product.get('price')}</div>
      	<CartAddWidget product={this.props.product} cartItem={this.createCartItem(this.props.product.get('id'))}/>
      </div>
		);
	},
  createCartItem: function(id) {
    var cartItem = new CartItem();
    cartItem.set('product_id', id);
    return cartItem;
  },
  truncateString: function(length, string) {
    var substring = "";
    if (string) {
      substring = (string.length > length) ? string.substr(0, length - 1) + '&hellip;' : string;
    }
    return  substring;
  }
});