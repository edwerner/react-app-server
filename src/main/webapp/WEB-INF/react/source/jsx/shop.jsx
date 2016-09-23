import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/shop.scss';
import ProductCollection from '../javascripts/products';
import {renderLoader, hideLoader} from './loader.jsx';
var ProductTile = require('./product-tile.jsx');
var Cart = require('./cart.jsx');

var ShopPage = React.createClass({
	render: function() {
    if (!this.props.products) {
        return null;
    }
		return (
			<div className='shop__wrapper flex'>
				<div className={this.props.showLink ? 'hidden' : 'products__wrapper'}>
					<div className='product__tiles flex flex-row-wrap flex-row flex-center'>
	    			{this.props.products.models.map(function(product, key) {
	            return <ProductTile product={product} key={key}/>
	          })}
	        </div>
		    </div>
		    <Cart showLink='' />
	    </div>
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
    renderOverlayModal('Error', error.responseJSON.message, false);
	});
}

export function renderShopPage(products) {
	ReactDOM.render(<ShopPage showLink='' products={products}/>, document.getElementById('shop__container'));
}

export function hideShopPage() {
	ReactDOM.render(<ShopPage showLink='hidden'/>, document.getElementById('shop__container'));
}	