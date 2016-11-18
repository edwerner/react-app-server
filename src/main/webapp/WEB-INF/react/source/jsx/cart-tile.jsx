import React from 'react';
import ReactDOM from 'react-dom';
import scss from '../scss/cart.scss';
import {formatCartItems, renderCart} from './cart.jsx';
import {renderLoader, hideLoader} from './loader.jsx';
import {fetchCart, renderShopPage} from './shop.jsx';
import {renderCartAddWidget} from './cart-add-widget.jsx';

module.exports = React.createClass({
	getInitialState: function() {
		return {
		  closeButtonHover: ''
		}
	},
	render: function() {
		var product = this.props.product;
	    if (!product || !this.props.products || !this.props.cartItem) {
	        return null;
	    }
		return (
			<div className='cart__tile flex flex-space-between flex-row flex-vertical-center'>
				 <div className='cart__tile-title flex-start'>{product.get('title')}</div>
				 <div className="flex-end">
				 	<img className="cart__tile-image" src={product.get('image')}/>
				 </div>
				<div className={this.state.closeButtonHover ? 'cart__remove-button flex-end button-mouseenter' : 'overlay__close-button flex-end button-mouseleave'}
				onClick={this.removeFromCart} onMouseEnter={this.onRemoveCartItemMouseEnter} onMouseLeave={this.onRemoveCartItemMouseLeave}>
					<img className='overlay__close-button-image' src='../../../../resources/images/close-button.svg'/>
				</div>
		    </div>
		);
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
	      renderShopPage(products, cartItems);
	      renderCart(products, cartItems);
	    });
	    $.when(promise).fail(function(error) {
	    	hideLoader();
	    	console.log(error);
	  		renderOverlayModal('Error', error.responseJSON.message, false);
	    });
	},
	onRemoveCartItemMouseEnter: function() {
		this.setState({'closeButtonHover': 'mouseenter'});
	},
	onRemoveCartItemMouseLeave: function() {
		this.setState({'closeButtonHover': ''});
	}
});