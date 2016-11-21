import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderCart} from './cart.jsx';
import {renderOverlayModal} from './overlay.jsx';
import {formatCartItems} from './cart.jsx';

module.exports = React.createClass({
	getInitialState: function() {
		return {
			buttonText: '',
			cartItem: this.props.cartItem,
			cartItems: this.props.cartItems,
			products: this.props.products
		}
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({cartItem: nextProps.cartItem});
		this.setState({cartItems: nextProps.cartItems});
		this.setState({products: nextProps.products});
		this.updateWidgetText(nextProps.cartItem, nextProps.cartItems);
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },
	componentWillMount: function() {
		this.updateWidgetText(this.state.cartItem, this.state.cartItems);
	},
	updateWidgetText: function(cartItem, cartItems) {
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
	    this.setState({buttonText: 'Product Unavailable'});
		}
	},
	render: function() {
	    if (!this.state.cartItem || !this.state.products || !this.state.cartItems) {
	        return null;
	    }
		return(
			<div className='cart__add-widget-container'>
				<div onClick={this.addToCart} className={this.state.buttonText == 'Add to Cart' ? 'cart__add-widget width__100 flex flex-center flex-vertical-center' : 'hidden'}>
					<h4>{this.state.buttonText}</h4>
				</div>
				<div onClick={this.removeFromCart} className={this.state.buttonText == 'Remove from Cart' ? 'cart__add-widget width__100 flex flex-center flex-vertical-center' : 'hidden'}>
					<h4>{this.state.buttonText}</h4>
				</div>
	      	</div>
		);
	},
	setButtonText: function(status) {
		return this.setState({buttonText: status});
	},
	addToCart: function() {
		var _this = this;
		var cartItem = this.props.cartItem;
		var products = this.props.products;
		cartItem.url = '/cartitemadd';
		var promise = cartItem.save();
		renderLoader();
	    $.when(promise).done(function(data) {
	      hideLoader();
	      var cartItems = formatCartItems(data);
	      _this.setButtonText('Remove from Cart');
	      renderCart(products, cartItems);
	    });
	    $.when(promise).fail(function(error) {
	    	hideLoader();
	    	console.log(error);
	  		renderOverlayModal('Error', error.responseJSON.message, false);
	    });
	},
	removeFromCart: function() {
		var _this = this;
		var cartItem = this.props.cartItem;
		var products = this.props.products;
		cartItem.url = '/cartitemremove';
		var promise = cartItem.save();
		renderLoader();
	    $.when(promise).done(function(data) {
	      hideLoader();
	      var cartItems = formatCartItems(data);
	      _this.setButtonText('Add to Cart');
	      renderCart(products, cartItems);
	    });
	    $.when(promise).fail(function(error) {
	    	hideLoader();
	  		renderOverlayModal('Error', error.responseJSON.message, false);
	    	console.log(error);
	    });
	},
	decrementQuantity: function() {
		var cartItem = this.props.cartItem;
		var quantity = this.state.quantity;
		if (quantity > 0) {
			quantity -= 1;
			cartItem.set('quantity', quantity);
			var promise = cartItem.save();
	    $.when(promise).done(function(data) {

	    });
	    $.when(promise).fail(function(error) {
	    	console.log(data);
	    });
		}
	}
});