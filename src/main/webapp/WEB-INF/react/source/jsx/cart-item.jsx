
import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/shop.scss';

var CartItem = React.createClass({
	render: function() {
		var productId = this.props.productId;
	    if (!productId) {
	        return null;
	    }
		return (
			<div>{productId}</div>
		);
	}
});