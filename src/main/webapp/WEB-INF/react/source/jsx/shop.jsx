import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/shop.scss';
import $ from 'jquery';
import Product from '../javascripts/product';
import ProductCollection from '../javascripts/products';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
import ProductTile from './product-tile.jsx';
import Cart from '../javascripts/cart';
import {hideCart, renderCart} from './cart.jsx';

var Shop = React.createClass({
	render: function() {
		var products = this.props.products.models;
		console.log(products);
		console.log(typeof products);
	    if (!products) {
	        return null;
	    }
		return (
			<div className='flex flex-row flex-row-wrap'>
			    {products.map(function(product, index) {
			        return <ProductTile product={product} key={index}/>;
			    })}
		    </div>
		);
	}
});

export function fetchProducts() {
	var productCollection = new ProductCollection();
	var promise = productCollection.fetch();
    Backbone.emulateHTTP = true;
	renderLoader();
	$.when(promise).done(function(data) {
		console.log(data);
		hideLoader();
		Backbone.history.navigate('shop', {trigger:true});
		renderShopPage(productCollection);
		fetchCart();
	});
	$.when(promise).fail(function(error) {
		hideLoader();
    	renderOverlayModal('Error', error.message, false);
	});
}

export function fetchCart() {
	var cart = new Cart();
	var promise = cart.fetch();
    Backbone.emulateHTTP = true;
	renderLoader();
	$.when(promise).done(function(data) {
		console.log(cart);
		hideLoader();
		// renderCart(cart.get('cartItemList'));
	});
	$.when(promise).fail(function(error) {
		hideLoader();
    	renderOverlayModal('Error', error.message, false);
	});

}

export function renderShopPage(products) {
	ReactDOM.render(<Shop showLink='' products={products}/>, document.getElementById('shop__container'));
}

export function hideShopPage() {
	ReactDOM.render(<Shop showLink='hidden'/>, document.getElementById('shop__container'));
}	