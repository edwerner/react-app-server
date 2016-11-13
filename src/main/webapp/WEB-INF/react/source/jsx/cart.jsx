var React = require('react');
var ReactDOM =  require('react-dom');
var scss = require('../scss/cart.scss');
var CartItem = require('./cart-item.jsx');
import CartTile from './cart-tile.jsx';
import _ from 'underscore';

var Cart = React.createClass({
	render: function() {
		var cartItems = this.props.cartItems.models;
		var products = this.props.products.models;
		var _this = this;
	    if (!cartItems || !products) {	
	        return null;
	    }
		return (
			<div className='cart__wrapper flex flex-row flex-row-wrap'>
			    {cartItems.map(function(cartItem, index) {
			        return <CartTile product={_this.getProductById(products, cartItem.get('productId'))} key={index}/>;
			    })}
		    </div>
		);
	},
	getProductById: function(products, productId) {
		var productMatch = _.find(products, function(product) {
			return product.get('id') == productId;
		});
		return productMatch;
	}
});

var cartContainer = document.getElementById("cart__container");

export function renderCart(products, cartItems) {
	cartContainer.className = cartContainer.className.replace(/\hidden\b/,'');
  ReactDOM.render(<Cart showLink='' products={products} cartItems={cartItems}/>, cartContainer);
}

export function hideCart() {
	cartContainer.className += ' hidden';
	ReactDOM.render(<Cart showLink='hidden'/>, cartContainer);
}