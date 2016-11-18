import React from 'react';
import ReactDOM from 'react-dom';
import scss from '../scss/cart.scss';
import CartTile from './cart-tile.jsx';
import CartItem from '../javascripts/cart-item';
import CartItems from '../javascripts/cart-items';
import _ from 'underscore';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
// import {renderReviewPage} from './review.jsx';

var Cart = React.createClass({
	render: function() {
		var cartItems = this.props.cartItems;
		var products = this.props.products;
		// console.log(cartItems);
		// console.log(products);
		var _this = this;
	    if (!cartItems || !products) {
	        return null;
	    }
		return (
			<div className='cart__wrapper flex flex-column'>
				<button onClick={this.routeToReviewPage}>Submit Order</button>
			    {cartItems.models.map(function(cartItem, index) {
			        return <CartTile cartItem={cartItem} product={_this.getProductById(products, cartItem.get('productId'))} products={products} key={index}/>;
			    })}
		    </div>
		);
	},
	routeToReviewPage: function() {
	  	Backbone.history.navigate('review', {trigger:true});
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
  ReactDOM.render(<Cart showLink='' products={products} cartItems={cartItems}/>, cartContainer);
}

export function hideCart() {
	ReactDOM.render(<Cart showLink='hidden'/>, cartContainer);
}

export function formatCartItems(array) {
	var cartItems = new CartItems();
	// console.log(array);
	// var obj = array[0];
	for (var i = 0; i < array.length; i++) {
		var cartItem = new CartItem();
		var item = array[i];
		cartItem.set('productId', item.productId);
		cartItems.add(item);
	}
	// console.log("******************");
	// console.log(cartItems);
	// console.log(array);
	return cartItems;
}