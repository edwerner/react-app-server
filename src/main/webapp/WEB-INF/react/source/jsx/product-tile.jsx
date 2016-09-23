var React = require('react');
var CartAddWidget = require('./cart-add-widget.jsx');
var CartItem = require('../javascripts/cart-item');

module.exports = React.createClass({
	render: function() {
		return(			
     	<div className='product__tile flex flex-space-between flex-column'>
     		<img className='product__image' src={this.props.product.get('image')}/>
      	<div className='product__title'>{this.props.product.get('name')}</div>
      	<div className='product__description'>{this.props.product.get('description')}</div>
      	<div className='product__price'>${this.props.product.get('price')}</div>
      	<CartAddWidget product={this.props.product} cartItem={this.createCartItem(this.props.product.get('id'))}/>
      </div>
		);
	},
  createCartItem: function(id) {
    var cartItem = new CartItem();
    cartItem.set('product_id', id);
    return cartItem;
  }
});