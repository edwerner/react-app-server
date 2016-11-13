var React = require('react');
var ReactDOM =  require('react-dom');
var scss = require('../scss/cart.scss');
var CartItem = require('./cart-item.jsx');
import {getProductById} from './shop.jsx'

module.exports = React.createClass({
	render: function() {
		var product = this.props.product;
	    if (!product) {
	        return null;
	    }
		return (
			<div className='cart__tile flex flex-row flex-row-wrap'>
			 <h1>{product.get('title')}</h1>
			 <img src={product.get('image')}/>
		    </div>
		);
	}
});
