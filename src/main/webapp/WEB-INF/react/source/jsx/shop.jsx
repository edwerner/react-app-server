import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/shop.scss';
import ProductCollection from '../javascripts/products';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
var ProductTile = require('./product-tile.jsx');
var Cart = require('./cart.jsx');

var Orders = React.createClass({
	render: function() {
    if (!this.props.products) {
        return null;
    }
		return (
			<h1>Orders</h1>
		);
	}
});

export function fetchProducts() {
	var productCollection = new ProductCollection();
	var promise = productCollection.fetch();
	renderLoader();
	$.when(promise).done(function(data) {
		hideLoader();
		renderShopPage(productCollection);
	});
	$.when(promise).fail(function(error) {
		hideLoader();
    	renderOverlayModal('Error', error.message, false);
	});
}

export function renderShopPage(products) {
	ReactDOM.render(<Orders showLink='' products={products}/>, document.getElementById('shop__container'));
}

export function hideShopPage() {
	ReactDOM.render(<Orders showLink='hidden'/>, document.getElementById('shop__container'));
}	