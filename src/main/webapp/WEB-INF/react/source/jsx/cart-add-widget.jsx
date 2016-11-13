var React = require('react');
var CartItem = require('../javascripts/cart-item');
import CartItems from '../javascripts/cart-items';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderCart} from './cart.jsx'

module.exports = React.createClass({
	getInitialState: function() {
		return {
			buttonText: 'Add to Cart'
		}
	},
	render: function() {
	    if (!this.props.cartItem || !this.props.products) {
	        return null;
	    }
		return(
			<div className='cart__add-widget'>
				<div onClick={this.addToCart} className={this.state.buttonText == 'Add to Cart' ? 'cart__add-widget width__100 flex flex-row flex-vertical-center' : 'hidden'}>
					<h4>{this.state.buttonText}</h4>
				</div>
				<div onClick={this.removeFromCart} className={this.state.buttonText == 'Remove from Cart' ? 'cart__add-widget width__100 flex flex-row flex-vertical-center' : 'hidden'}>
					<h4>{this.state.buttonText}</h4>
				</div>
	      	</div>
		);
	},
	addToCart: function() {
		var cartItem = this.props.cartItem;
		// console.log(cartItem.get('productId'));
		// var quantity = this.state.quantity;
		var _this = this;

    	Backbone.emulateHTTP = true;
		// quantity += 1;
		// cartItem.set('quantity', quantity);
		// this.setState({quantity: quantity});
		cartItem.set('url', '/cartitemadd')
		var promise = cartItem.save();
		renderLoader();
	    $.when(promise).done(function(data) {
	      // window.localStorage.setItem('shop-token', data.token);
	      // hideLoader();
	      // _this.resetForm();
	      // renderOverlayModal(data.title, data.message, data.success);
	      hideLoader();
	      _this.setState({'buttonText': 'Remove from Cart'});

	      // data returns list
	      renderCart(_this.props.products, _this.formatCartItems(data));
	      console.log(data);
	    });
	    $.when(promise).fail(function(error) {
	    	hideLoader();
	    	console.log(error);
	      // hideLoader();
	      // renderOverlayModal('Error', error.responseJSON.message, false);
	    });
	},
	removeFromCart: function() {
		var cartItem = this.props.cartItem;
		// var quantity = this.state.quantity;
		var _this = this;
		// quantity += 1;
		// cartItem.set('quantity', quantity);
		// this.setState({quantity: quantity});
		cartItem.set('url', '/cartitemremove')
		var promise = cartItem.save();
	    $.when(promise).done(function(data) {
	      // window.localStorage.setItem('shop-token', data.token);
	      // hideLoader();
	      // _this.resetForm();
	      // renderOverlayModal(data.title, data.message, data.success);
	      _this.setState({'buttonText': 'Add to Cart'});
	      console.log(data);
	    });
	    $.when(promise).fail(function(error) {
	    	console.log(data);
	      // hideLoader();
	      // renderOverlayModal('Error', error.responseJSON.message, false);
	    });
	},
	formatCartItems: function(array) {
		var cartItems = new CartItems();
		// console.log(array);
		// var obj = array[0];
		for (var i = 0; i < array.length; i++) {
			var cartItem = new CartItem();
			var item = array[i];
			cartItem.set('productId', item.productId);
			cartItems.add(item);
		}
		console.log("******************");
		console.log(cartItems);
		return cartItems;
	},
	decrementQuantity: function() {
		var cartItem = this.props.cartItem;
		var quantity = this.state.quantity;
		if (quantity > 0) {
			quantity -= 1;
			cartItem.set('quantity', quantity);
			this.setState({quantity: quantity});
			var promise = cartItem.save();
	    $.when(promise).done(function(data) {
	      // window.localStorage.setItem('shop-token', data.token);
	      // hideLoader();
	      // _this.resetForm();
	      // renderOverlayModal(data.title, data.message, data.success);
	      console.log(data);
	    });
	    $.when(promise).fail(function(error) {
	    	console.log(data);
	      // hideLoader();
	      // renderOverlayModal('Error', error.responseJSON.message, false);
	    });
		}
	}
});