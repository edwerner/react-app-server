import Backbone from 'backbone';
import $ from 'jquery';
import {renderLoginForm, hideLoginForm} from '../jsx/login.jsx';
import {renderUserForm, hideCreateUserForm} from '../jsx/register.jsx';
import {renderIndex, hideIndex} from '../jsx/index.jsx';
import {renderMenu} from '../jsx/menu.jsx';
import {hideCart} from '../jsx/cart.jsx';
import {fetchProducts, hideShopPage, renderShopPage} from '../jsx/shop.jsx';
import {fetchReviewProducts, hideReviewPage} from '../jsx/review.jsx';
import App from './globals';

App.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'signin': 'signin',
		'signup': 'signup',
		'orders': 'orders',
		'shop': 'shop',
		'review':'review'
	},
	index: function() {
		hideLoginForm();
		hideCreateUserForm();
		hideShopPage();
		renderIndex();
		hideCart();
		hideReviewPage();
		renderMenu(null, 'active', null, null, null, null);
	},
	signin: function() {
		hideIndex();
		hideCreateUserForm();
		hideShopPage();
		renderLoginForm();
		hideCart();
		hideReviewPage();
		renderMenu('active', null, null, null, null, null);
	},
	signup: function() {
		hideIndex();
		hideLoginForm();
		hideShopPage();
		renderUserForm();
		hideCart();
		hideReviewPage();
		renderMenu(null, null, 'active', null, null, null);
	},
	orders: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideLoginForm();
		hideCreateUserForm();
		hideCart();
		hideReviewPage();
		renderMenu(null, null, null, 'active', null, null);
	},
	shop: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideLoginForm();
		hideCreateUserForm();
		hideReviewPage();
		fetchProducts();
		renderShopPage();
		renderMenu(null, null, null, null, 'active', null);
	},
	review: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideLoginForm();
		hideCreateUserForm();
		hideShopPage();
		hideCart();
		fetchReviewProducts();
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