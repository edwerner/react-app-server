import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/shop.scss';
import Products from '../javascripts/products';
import OrdersCollection from '../javascripts/orders';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
var ProductTile = require('./product-tile.jsx');
import OrderTile from './order-tile.jsx';

var Orders = React.createClass({
	render: function() {
		var orders = this.props.orders;
		var products = this.props.products;
	    if (!orders || !products) {
	        return null;
	    }
		return (
			<div id='orders__tile-container'>
			    <h1>Orders</h1>
			    {orders.models.map(function(order, index) {
			        return <OrderTile order={order} products={products} key={index}/>;
			    })}
		    </div>
		);
	}
});

var ordersContainer = document.getElementById('orders__container');

export function renderOrdersPage(orders, products) {
	ReactDOM.render(<Orders showLink='' orders={orders} products={products}/>, ordersContainer);
}

export function hideOrdersPage() {
	ReactDOM.render(<Orders showLink='hidden'/>, ordersContainer);
}

export function routeToOrdersPage() {
	var products = new Products();
	var promise = products.fetch();
	renderLoader();
	$.when(promise).done(function(data) {
		hideLoader();
		fetchOrders(products.models);
	});
	$.when(promise).fail(function(error) {
		hideLoader();
     	renderOverlayModal('Error', error.responseJSON.message, false);
	});
}

export function fetchOrders(products) {
	var orders = new OrdersCollection();
	var promise = orders.fetch();
	renderLoader();
	$.when(promise).done(function(data) {
		hideLoader();
		Backbone.history.navigate('orders', {trigger:true});
		renderOrdersPage(orders, products);
	});
	$.when(promise).fail(function(error) {
		hideLoader();
     	renderOverlayModal('Error', error.responseJSON.message, false);
	});
}