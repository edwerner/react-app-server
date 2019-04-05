import React from 'react';
import ReactDOM from 'react-dom';
import scssLoader from '../scss/cart.scss';
import CartTile from './cart-tile.jsx';
import CartItem from '../javascripts/cart-item';
import CartItems from '../javascripts/cart-items';
import Products from '../javascripts/products';
import ReviewTile from './review-tile.jsx';
import Order from '../javascripts/order';
import _ from 'underscore';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
import {renderOrderPage} from './order.jsx';

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
			    <button onClick={this.submitOrder}>Submit Order</button>
		    </div>
		);
	},
	submitOrder: function() {
		var order = new Order();
		var promise = order.fetch();
		var _this = this;
		var products = this.props.products;
		renderLoader();
		$.when(promise).done(function(data) {
			hideLoader();
			_this.clearCartItems(order, products);
		});
		$.when(promise).fail(function(error) {
			hideLoader();
	     	renderOverlayModal('Error', error.responseJSON.message, false);
		});
	},
	clearCartItems: function(order, products) {	
		var promise = $.ajax({
		   url: '/cartitemclear',
		   type: 'GET',
		   dataType: 'text'
		});
		var _this = this;
		renderLoader();
		$.when(promise).done(function(data) {
			hideLoader();
			_this.routeToOrderPage();
			renderOrderPage(order, products);
		});
		$.when(promise).fail(function(error) {
			hideLoader();
	     	renderOverlayModal('Error', error.responseJSON.message, false);
		});
	},
	routeToOrderPage: function() {
	  	Backbone.history.navigate('order', {trigger:true});
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
      if (cartItems.length) {
		  Backbone.history.navigate('review', {trigger:true});
	      renderReviewPage(products, cartItems);
      } else {
      	renderOverlayModal('Error', 'Nothing to review', false);
      }
  	});
    $.when(promise).fail(function(error) {
    	hideLoader();
    	console.log(error);
      	renderOverlayModal('Error', error.responseJSON.message, false);
    });
}