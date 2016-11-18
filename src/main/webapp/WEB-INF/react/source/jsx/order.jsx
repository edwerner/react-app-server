import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/shop.scss';

var Order = React.createClass({
	render: function() {
		var order = this.props.order;
		var productList = null;
	    if (!order) {
	        return null;
	    } else {
	    	productList = order.get('productList');
	    	if (productList == null) {
	    		return null;
	    	}
	    }
		return (
			<div className='flex flex-column'>
				<h1>Order Receipt</h1>
			    {productList.map(function(productId, index) {
			        return <div>{productId}</div>;
			    })}
		    </div>
		);
	}
});

var orderContainer = document.getElementById('order__container');

export function renderOrderPage(order, products) {
	ReactDOM.render(<Order showLink='' order={order} products={products}/>, orderContainer);
}

export function hideOrderPage() {
	ReactDOM.render(<Order showLink='hidden'/>, orderContainer);
}