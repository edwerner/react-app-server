var React = require('react');
var ReactDOM =  require('react-dom');
var scss = require('../scss/cart.scss');

module.exports = React.createClass({
	render: function() {
		return (
			<div className='cart__wrapper'>
				<h1>Cart</h1>
			</div>
		);
	}
});