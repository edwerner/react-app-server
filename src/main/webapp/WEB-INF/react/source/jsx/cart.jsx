// var React = require('react');
// var ReactDOM =  require('react-dom');
// var scss = require('../scss/cart.scss');
// var CartItem = require('./cart-item.jsx');

// var Cart = React.createClass({
// 	render: function() {
// 		var cartItems = this.props.cartItems.models;
// 	    if (!cartItems) {
// 	        return null;
// 	    }
// 		return (
// 			<div className='cart__wrapper flex flex-row flex-row-wrap'>
// 			    {cartItems.map(function(cartItem, index) {
// 			        return <CartItem productId={cartItem.get('productId')}/>;
// 			    })}
// 		    </div>
// 		);
// 	}
// });

// var cartContainer = document.getElementById("cart__container");

// export function renderCart(cartItems) {
// 	cartContainer.className = cartContainer.className.replace(/\hidden\b/,'');
//   ReactDOM.render(<Cart showLink='' cartItems={cartItems}/>, cartContainer);
// }

// export function hideCart() {
// 	cartContainer.className += ' hidden';
// 	ReactDOM.render(<Cart showLink='hidden'/>, cartContainer);
// }