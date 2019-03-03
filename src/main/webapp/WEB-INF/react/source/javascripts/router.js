import Backbone from 'backbone';
import $ from 'jquery';
import {renderLoginForm, hideLoginForm} from '../jsx/login.jsx';
import {renderUserForm, hideCreateUserForm} from '../jsx/register.jsx';
import {renderIndex, hideIndex} from '../jsx/index.jsx';
import {renderMenu} from '../jsx/menu.jsx';
import {hideCart} from '../jsx/cart.jsx';
import {fetchProducts, hideShopPage, renderShopPage} from '../jsx/shop.jsx';
import {fetchReviewProducts, hideReviewPage} from '../jsx/review.jsx';
import {hideOrderPage} from '../jsx/order.jsx';
import {hideProductDetails} from '../jsx/product-details.jsx';
import {hideOrdersPage, routeToOrdersPage} from '../jsx/orders.jsx';
import {hideAdminPage, routeToAdminPage} from '../jsx/admin.jsx';

var App = {};

App.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'signin': 'signin',
		'signup': 'signup',
		'orders': 'orders',
		'shop': 'shop',
		'review':'review',
		'order': 'order',
		'admin': 'admin'
	},
	index: function() {
		hideLoginForm();
		hideCreateUserForm();
		hideShopPage();
		renderIndex();
		hideCart();
		hideReviewPage();
		hideOrderPage();
		hideProductDetails();
		hideOrdersPage();
		hideAdminPage();
		renderMenu(null, 'active', null, null, null, null);
	},
	signin: function() {
		hideIndex();
		hideCreateUserForm();
		hideShopPage();
		renderLoginForm();
		hideCart();
		hideReviewPage();
		hideOrderPage();
		hideProductDetails();
		hideOrdersPage();
		hideAdminPage();
		renderMenu('active', null, null, null, null, null);
	},
	signup: function() {
		hideIndex();
		hideLoginForm();
		hideShopPage();
		renderUserForm();
		hideCart();
		hideReviewPage();
		hideOrderPage();
		hideProductDetails();
		hideOrdersPage();
		hideAdminPage();
		renderMenu(null, null, 'active', null, null, null);
	},
	orders: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideCart();
		hideShopPage();
		hideReviewPage();
		hideOrderPage();
		hideProductDetails();
		routeToOrdersPage();
		hideAdminPage();
		renderMenu(null, null, null, 'active', null, null);
	},
	order: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideReviewPage();
		hideShopPage();
		hideCart();
		hideProductDetails();
		hideOrdersPage();
		hideAdminPage();
		renderMenu(null, null, null, null, null, null);
	},
	shop: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideReviewPage();
		hideOrderPage();
		hideProductDetails();
		hideOrdersPage();
		hideAdminPage();
		fetchProducts();
		renderMenu(null, null, null, null, 'active', null);
	},
	review: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideShopPage();
		hideCart();
		hideOrderPage();
		hideProductDetails();
		hideOrdersPage();
		hideAdminPage();
		fetchReviewProducts();
		renderMenu(null, null, null, null, null, null);
	},
	admin: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideShopPage();
		hideCart();
		hideOrderPage();
		hideProductDetails();
		hideOrdersPage();
		routeToAdminPage();
		renderMenu(null, null, null, null, null, 'active');
	}
});

new App.Router();
Backbone.history.start({pushState: true});
Backbone.emulateHTTP = true;

var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) {
	xhr.setRequestHeader(header, token);
});