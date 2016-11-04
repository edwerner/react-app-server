import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/shop.scss';
import ProductCollection from '../javascripts/products';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
var ProductTile = require('./product-tile.jsx');
var Cart = require('./cart.jsx');

var Shop = React.createClass({
	render: function() {
		var products = this.props.products.models;
		console.log(products);
		console.log(typeof products);
	    if (!products) {
	        return null;
	    }
		return (
			<div>
			    {products.map(function(product) {
			        return <ProductTile product={product}/>;
			    })}
		    </div>
		);
	}
});

export function fetchProducts() {
	var productCollection = new ProductCollection();
    Backbone.emulateHTTP = true;
	var promise = productCollection.fetch();
	renderLoader();
	$.when(promise).done(function(data) {
		hideLoader();
		Backbone.history.navigate('shop', {trigger:true});
		renderShopPage(productCollection);
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