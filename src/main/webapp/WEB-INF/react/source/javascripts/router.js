import Backbone from 'backbone';
import $ from 'jquery';
import {renderLoginForm, hideLoginForm} from '../jsx/login.jsx';
import {renderUserForm, hideCreateUserForm} from '../jsx/register.jsx';
import {renderIndex, hideIndex} from '../jsx/index.jsx';
import {renderMenu} from '../jsx/menu.jsx';
import {hideShopPage, renderShopPage} from '../jsx/orders.jsx';
import {routeToShopPage} from '../jsx/overlay.jsx';
import {renderCart, hideCart} from '../jsx/cart.jsx';

var App = {};

App.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'signin': 'signin',
		'signup': 'signup',
		'orders': 'orders',
		'shop': 'shop'
	},
	index: function() {
		hideLoginForm();
		hideCreateUserForm();
		hideShopPage();
		renderIndex();
		renderMenu(null, 'active', null, null, null);
	},
	signin: function() {
		hideIndex();
		hideCreateUserForm();
		hideShopPage();
		renderLoginForm();
		renderMenu('active', null, null, null, null);
	},
	signup: function() {
		hideIndex();
		hideLoginForm();
		hideShopPage();
		renderUserForm();
		renderMenu(null, null, 'active', null, null);
	},
	orders: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideLoginForm();
		hideCreateUserForm();
		// routeToShopPage();
		renderMenu(null, null, null, 'active', null);
	},
	shop: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideLoginForm();
		hideCreateUserForm();
		renderShopPage();
		renderMenu(null, null, null, null, 'active');
	}
});

new App.Router();
Backbone.history.start({pushState: true});

var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) {
	xhr.setRequestHeader(header, token);
});