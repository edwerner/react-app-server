import React from 'react';
import ReactDOM from 'react-dom';
import sassLoader from '../scss/shop.scss';
import $ from 'jquery';
import Product from '../javascripts/product';
import Products from '../javascripts/products';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
import ProductTile from './product-tile.jsx';
import Cart from '../javascripts/cart';
import CartItems from '../javascripts/cart-items';
import {hideCart, renderCart} from './cart.jsx';

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
  componentDidMount: function() {
  	this.bindWindowResize();
  },
  componentDidUpdate: function() {
  	this.resizeContainerHeight();
  },
  bindWindowResize: function() {
  	var _this = this;
  	$(window).bind('resize', function() {
  		_this.resizeContainerHeight();
  	});
  },
  checkForOverflow: function(ratio) {
  	var windowWidth = $(window).width();
  	var remainder = null;
  	if (ratio > windowWidth) {
  		remainder = ratio - windowWidth;
		}
		return remainder;
  },
  resizeContainerHeight: function() {
  	var _this = this;
  	var counter = 1;
  	var padding = 10;
  	var containerHeight = $('.product__tile').first().height();
		$('.product__tile').each(function(index) {
			var tileWidth = $(this).width() + padding;
			var tileHeight = ($(this).height() + padding) * 2;
			var ratio = tileWidth * counter;
			var overflow = _this.checkForOverflow(ratio);
			if (overflow) {
				containerHeight += tileHeight;
				counter = 1;
			} else {
				counter += 1;
			}
		});
		$('#product__tile-container').css('max-height', containerHeight + 'px');
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
			<div id='product__tile-container' className='flex flex-column flex-column-wrap flexbox-item-grow'>
			    {products.map(function(product, index) {
			        return <ProductTile products={products} cartItems={cartItems} product={product} key={index}/>;
			    })}
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

var shopContainer = document.getElementById('shop__container');

export function renderShopPage(products, cartItems) {
	ReactDOM.render(<Shop showLink='' products={products} cartItems={cartItems}/>, shopContainer);
}

export function hideShopPage() {
	ReactDOM.render(<Shop showLink='hidden'/>, shopContainer);
}