import Backbone from 'backbone';
import {renderLoginForm, hideLoginForm} from '../jsx/login.jsx';
import {renderUserForm, hideCreateUserForm} from '../jsx/register.jsx';
import {renderIndex, hideIndex} from '../jsx/index.jsx';
import {renderMenu} from '../jsx/menu.jsx';
import {hideShopPage} from '../jsx/shop.jsx';
import {routeToShopPage} from '../jsx/overlay.jsx';
import {renderCart, hideCart} from '../jsx/cart.jsx';

var App = {};

App.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'login': 'login',
		'register': 'register',
		'shop': 'shop'
	},
	index: function() {
		hideLoginForm();
		hideCreateUserForm();
		hideShopPage();
		renderIndex();
		renderMenu(null, 'active', null, null);
	},
	login: function() {
		hideIndex();
		hideCreateUserForm();
		hideShopPage();
		renderLoginForm();
		renderMenu('active', null, null, null);
	},
	register: function() {
		hideIndex();
		hideLoginForm();
		hideShopPage();
		renderUserForm();
		renderMenu(null, null, 'active', null);
	},
	shop: function() {
		hideIndex();
		hideLoginForm();
		hideCreateUserForm();
		hideLoginForm();
		hideCreateUserForm();
		routeToShopPage();d
		renderMenu(null, null, null, 'active');
	}
});

new App.Router();
Backbone.history.start({pushState: true});