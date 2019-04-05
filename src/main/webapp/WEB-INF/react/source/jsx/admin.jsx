import React from 'react';
import ReactDOM from 'react-dom';
import sassLoader from '../scss/admin.scss';
import Products from '../javascripts/products';
import OrdersCollection from '../javascripts/orders';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
var ProductTile = require('./product-tile.jsx');
import AdminTile from './admin-tile.jsx';

module.exports = React.createClass({
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
			        return <AdminTile order={order} products={products} key={index}/>;
			    })}
		    </div>
		);
	}
});

var adminContainer = document.getElementById('admin__container');

export function renderAdminPage(orders, products) {
	ReactDOM.render(<Admin showLink='' orders={orders} products={products}/>, adminContainer);
}

export function hideAdminPage() {
	ReactDOM.render(<Admin showLink='hidden'/>, adminContainer);
}

export function routeToAdminPage() {
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
	orders.url = '/allorders';
	var promise = orders.fetch();
	renderLoader();
	$.when(promise).done(function(data) {
		hideLoader();
		Backbone.history.navigate('admin', {trigger:true});
		renderAdminPage(orders, products);
	});
	$.when(promise).fail(function(error) {
		hideLoader();
     	renderOverlayModal('Error', error.responseJSON.message, false);
	});
}