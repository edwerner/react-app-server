import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/order.scss';
import _ from 'underscore';

var Order = React.createClass({
	render: function() {
		var order = this.props.order;
		var products = this.props.products;
		var productList = null;
		var _this = this;
	    if (!order || !products) {
	        return null;
	    } else {
	    	productList = order.get('productList');
	    	if (!productList) {
	    		return null;
	    	}
	    }
		return (
			<div className='flex flex-column'>
				<h1>Order Receipt</h1>
			    {productList.map(function(productId, index) {
			    	var product = _this.getCurrentProduct(products, productId);
			    	var image = product.get('image');
			    	var title = product.get('title');
			    	var subtitle = product.get('subtitle');
			    	var author = product.get('author');
			    	var isbn = product.get('isbn');
			    	var publishDate = product.get('publishDate');
			    	var language = product.get('language');
			    	var price = product.get('price');
			    	var description = product.get('description');
			    	var genre = product.get('genre');
			    	var pageCount = product.get('pageCount');
			    	var publisher = product.get('publisher');
			        return <div className='order__tile flex flex-column flex-space-between'>
			        	<div className={image ? 'flex-start' : 'hidden'}>
			        		<img className='order__tile-image' src={image}/>
			        	</div>
			        	<div className={title ? 'order__tile-title' : 'hidden' }>
			        		<label>Title &nbsp;</label> 
			        		{title}
			        	</div>
			        	<div className={subtitle ? 'order__tile-title' : 'hidden' }>
			        		<label>Subtitle &nbsp;</label> 
			        		{subtitle}
			        	</div>
			        	<div className={author ? 'order__tile-title' : 'hidden' }>
			        		<label>Author &nbsp;</label> 
			        		{author}
			        	</div>
			        	<div className={isbn ? 'order__tile-title' : 'hidden' }>
			        		<label>ISBN &nbsp;</label> 
			        		{isbn}
			        	</div>
			        	<div className={publishDate ? 'order__tile-title' : 'hidden' }>
			        		<label>Publish Date &nbsp;</label> 
			        		{publishDate}
			        	</div>
			        	<div className={language ? 'order__tile-title' : 'hidden' }>
			        		<label> Language &nbsp;</label> 
			        		{language}
			        	</div>
			        	<div className={price ? 'order__tile-title' : 'hidden' }>
			        		<label>Price &nbsp;</label> 
			        		{price}
			        	</div>
			        	<div className={description ? 'order__tile-title' : 'hidden' }>
			        		<label>Description &nbsp;</label> 
			        		{description}
			        	</div>
			        	<div className={genre ? 'order__tile-title' : 'hidden' }>
			        		<label>Genre &nbsp;</label> 
			        		{genre}
			        	</div>
			        	<div className={pageCount ? 'order__tile-title' : 'hidden' }>
			        		<label>Page Count&nbsp;</label> 
			        		{pageCount}
			        	</div>
			        	<div className={publisher ? 'order__tile-title' : 'hidden' }>
			        		<label>Publisher&nbsp;</label> 
			        		{publisher}
			        	</div>
			        </div>;
			    })}
		    </div>
		);
	},
	getCurrentProduct(products, productId) {
		var productMatch = _.find(products, function(product) {
			return product.get('id') == productId;
		});
		return productMatch;
	}
});

var orderContainer = document.getElementById('order__container');

export function renderOrderPage(order, products) {
	ReactDOM.render(<Order showLink='' order={order} products={products}/>, orderContainer);
}

export function hideOrderPage() {
	ReactDOM.render(<Order showLink='hidden'/>, orderContainer);
}