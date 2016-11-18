import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/shop.scss';
import $ from 'jquery';
import Product from '../javascripts/product';
import Products from '../javascripts/products';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
import ProductTile from './product-tile.jsx';
import Cart from '../javascripts/cart';
import CartItems from '../javascripts/cart-items';
import {hideCart, renderCart} from './cart.jsx';
import Callbacks from '../javascripts/globals';

var Shop = React.createClass({
	getInitialState: function() {
		return {
			cartItems: this.props.cartItems,
			products: this.props.products
		}
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({cartItems: nextProps.cartItems});
		this.setState({products: nextProps.products});
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },
	render: function() {
		var products = this.state.products;
		var cartItems = this.state.cartItems;
	    if (!products || !cartItems) {
	        return null;
	    }
		return (
			<div>
				<div className='flex flex-row flex-row-wrap'>
				    {products.map(function(product, index) {
				        return <ProductTile products={products} cartItems={cartItems} product={product} key={index}/>;
				    })}
			    </div>
		    </div>
		);
	}
});

export function fetchProducts() {
	var products = new Products();
	var promise = products.fetch();
	renderLoader();
	$.when(promise).done(function(data) {
		hideLoader();
		fetchCart(products);
	});
	$.when(promise).fail(function(error) {
		hideLoader();
     	renderOverlayModal('Error', error.responseJSON.message, false);
	});
}

export function fetchCart(products) {
	var cartItems = new CartItems();
	var promise = cartItems.fetch();
	renderLoader();
  $.when(promise).done(function(data) {
    hideLoader();
  	renderShopPage(products.models, cartItems);
    renderCart(products.models, cartItems);
  });
  $.when(promise).fail(function(error) {
  	hideLoader();
  	console.log(error);
    	renderOverlayModal('Error', error.responseJSON.message, false);
  });
}

export function renderShopPage(products, cartItems) {
	ReactDOM.render(<Shop showLink='' products={products} cartItems={cartItems}/>, document.getElementById('shop__container'));
}

export function hideShopPage() {
	ReactDOM.render(<Shop showLink='hidden'/>, document.getElementById('shop__container'));
}