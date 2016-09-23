var React = require('react');
var CartItem = require('../javascripts/cart-item');
var Carts = require('../javascripts/carts');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			quantity: 0
		}
	},
	render: function() {
    if (!this.props.cartItem) {
        return null;
    }
		return(
	      <div className='cart__add-widget width__100 flex flex-row flex-vertical-center flex-space-between'>
	      	<div className='cart__add-widget__minus cart__add-widget__button' onClick={this.decrementQuantity}>-</div>
	      	<div className='cart__add-widget__quantity'>{this.state.quantity}</div>
	      	<div className='cart__add-widget__plus cart__add-widget__button' onClick={this.incrementQuantity}>+</div>
	      </div>
		);
	},
	incrementQuantity: function() {
		var cartItem = this.props.cartItem;
		var quantity = this.state.quantity;
		var _this = this;
		quantity += 1;
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