import React from 'react';
import _ from 'underscore';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderCart} from './cart.jsx';
import {renderOverlayModal} from './overlay.jsx';
import {formatCartItems} from './cart.jsx';

module.exports = React.createClass({
	componentWillMount: function() {
		var cartItems = this.props.cartItems;
		if (cartItems) {
		    var cartItemMatch = _.find(cartItems.models, function(item) {
		    	return item.get('productId') == cartItem.get('productId');
		    });
		    if (cartItemMatch == undefined) {
		    	this.setState({buttonText: 'Add to Cart'});
		    }
		    else {
		    	this.setState({buttonText: 'Remove from Cart'});
		    }
		} else {
		    this.setState({buttonText: 'Remove from Cart'});
		}
	},
	getInitialState: function() {
		return {
			buttonText: ''
		}
	},
	render: function() {
		var cartItem = this.props.cartItem;
		var cartItems = this.props.cartItems;
	    if (!cartItem || !this.props.products || !cartItems) {
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
	setButtonText: function(added) {
		var buttonText = '';
		if (added) {
			buttonText = 'Remove from Cart';
		} else {
			buttonText = 'Add to Cart';
		}
		return buttonText;
	},
	addToCart: function() {
		// console.log(cartItem.get('productId'));
		// var quantity = this.state.quantity;
		var _this = this;
		var cartItem = this.props.cartItem;
		var products = this.props.products;

		Backbone.emulateHTTP = true;
		// quantity += 1;
		// cartItem.set('quantity', quantity);
		// this.setState({quantity: quantity});
		// cartItem.set('url', '/cartitemadd')
		cartItem.url = '/cartitemadd';
		var promise = cartItem.save();
		renderLoader();
	    $.when(promise).done(function(data) {
	      // window.localStorage.setItem('shop-token', data.token);
	      // hideLoader();
	      // _this.resetForm();
	      // renderOverlayModal(data.title, data.message, data.success);

	      // data returns list
	      // console.log(cartItem);
	      // _this.setAddButtonText();
	      hideLoader();
	      var cartItems = formatCartItems(data);
	      _this.setState({buttonText: 'Remove from Cart'});
	      renderCart(products, cartItems);
	      // renderCartAddWidget(products, cartItems);
	    });
	    $.when(promise).fail(function(error) {
	    	hideLoader();
	    	console.log(error);
	  		renderOverlayModal('Error', error.responseJSON.message, false);
	      // hideLoader();
	      // renderOverlayModal('Error', error.responseJSON.message, false);
	    });
	},
	removeFromCart: function() {
		// console.log(cartItem.get('productId'));
		// var quantity = this.state.quantity;
		var _this = this;
		var cartItem = this.props.cartItem;
		var products = this.props.products;

		Backbone.emulateHTTP = true;
		// quantity += 1;
		// cartItem.set('quantity', quantity);
		// this.setState({quantity: quantity});
		// cartItem.set('url', '/cartitemremove')
		cartItem.url = '/cartitemremove';
		var promise = cartItem.save();
		renderLoader();
	    $.when(promise).done(function(data) {
	      // window.localStorage.setItem('shop-token', data.token);
	      // hideLoader();
	      // _this.resetForm();
	      // renderOverlayModal(data.title, data.message, data.success);
	      // _this.setState({'buttonText': 'Add to Cart'});

	      // data returns list
		    	// console.log(cartItem);
		    	// console.log(products);
	      // console.log(cartItem);
	      hideLoader();
	      var cartItems = formatCartItems(data);
	      _this.setState({buttonText: 'Add to Cart'});
	      renderCart(products, cartItems);
	      // renderCartAddWidget(_this.props.products, cartItems);
	      // console.log(data);
	    });
	    $.when(promise).fail(function(error) {
	    	hideLoader();
	    	console.log(error);
	  		renderOverlayModal('Error', error.responseJSON.message, false);
	      // hideLoader();
	      // renderOverlayModal('Error', error.responseJSON.message, false);
	    });
	},
	decrementQuantity: function() {
		var cartItem = this.props.cartItem;
		var quantity = this.state.quantity;
		if (quantity > 0) {
			quantity -= 1;
			cartItem.set('quantity', quantity);
			// this.setState({quantity: quantity});
			var promise = cartItem.save();
	    $.when(promise).done(function(data) {
	      // window.localStorage.setItem('shop-token', data.token);
	      // hideLoader();
	      // _this.resetForm();
	      // renderOverlayModal(data.title, data.message, data.success);
	      // console.log(data);
	    });
	    $.when(promise).fail(function(error) {
	    	console.log(data);
	      // hideLoader();
	      // renderOverlayModal('Error', error.responseJSON.message, false);
	    });
		}
	}
});

export function renderCartAddWidget(products, cartItems) {
	ReactDOM.render(<Shop showLink='' products={products} cartItems={cartItems}/>, document.getElementById('shop__container'));
}