var React = require('react');
var CartItem = require('../javascripts/cart-item');
// var Carts = require('../javascripts/carts');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			buttonText: 'Add to Cart'
		}
	},
	render: function() {
	    if (!this.props.cartItem) {
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
		// quantity += 1;
		// cartItem.set('quantity', quantity);
		// this.setState({quantity: quantity});
		cartItem.set('url', '/cartitemadd')
		var promise = cartItem.save();
	    $.when(promise).done(function(data) {
	      // window.localStorage.setItem('shop-token', data.token);
	      // hideLoader();
	      // _this.resetForm();
	      // renderOverlayModal(data.title, data.message, data.success);
	      _this.setState({'buttonText': 'Remove from Cart'});
	      console.log(data);
	    });
	    $.when(promise).fail(function(error) {
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