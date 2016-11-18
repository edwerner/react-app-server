import React from 'react';
import ReactDOM from 'react-dom';
import scss from '../scss/cart.scss';
import CartTile from './cart-tile.jsx';
import CartItem from '../javascripts/cart-item';
import CartItems from '../javascripts/cart-items';
import Products from '../javascripts/products';
import ReviewTile from './review-tile.jsx';
import _ from 'underscore';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';

var Review = React.createClass({
	render: function() {
		var cartItems = this.props.cartItems;
		var products = this.props.products;
		var _this = this;
	    if (!cartItems || !products) {
	        return null;
	    }
		return (
			<div className='review__wrapper flex flex-column'>
				<h1>Review Page</h1>
			    {cartItems.map(function(cartItem, index) {
			        return <ReviewTile cartItem={cartItem} product={_this.getProductById(products, cartItem.get('productId'))} products={products} key={index}/>;
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

var reviewContainer = document.getElementById("review__container");

export function renderReviewPage(products, cartItems) {
  ReactDOM.render(<Review showLink='' products={products} cartItems={cartItems}/>, reviewContainer);
}

export function hideReviewPage() {
	ReactDOM.render(<Review showLink='hidden'/>, reviewContainer);
}

export function fetchReviewProducts() {
	var products = new Products();
	var promise = products.fetch();
	renderLoader();
	$.when(promise).done(function(data) {
		hideLoader();
		fetchReviewCartItems(products.models);
	});
	$.when(promise).fail(function(error) {
		hideLoader();
      	renderOverlayModal('Error', error.responseJSON.message, false);
	});
}

export function fetchReviewCartItems(products) {
	var cartItems = new CartItems();
	var promise = cartItems.fetch();
	renderLoader();
    $.when(promise).done(function(data) {
      hideLoader();
	  Backbone.history.navigate('review', {trigger:true});
      renderReviewPage(products, cartItems);    });
    $.when(promise).fail(function(error) {
    	hideLoader();
    	console.log(error);
      	renderOverlayModal('Error', error.responseJSON.message, false);
    });
}