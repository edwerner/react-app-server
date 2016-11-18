var React = require('react');
var CartAddWidget = require('./cart-add-widget.jsx');
var CartItem = require('../javascripts/cart-item');

module.exports = React.createClass({
	render: function() {
		return(			
     	<div className='product__tile flex flex-space-between flex-column'>
     		<img className='product__image' src={this.props.product.get('image')}/>
      	<h4 className='product__title'><label className='product__label'>Title: </label>{this.props.product.get('title')}</h4>
        <h4 className='product__subtitle'><label className='product__label'>Subtitle: </label>{this.props.product.get('subtitle')}</h4>
        <h4 className='product__author'><label className='product__label'>Author: </label>{this.props.product.get('author')}</h4>
        <div className='product__publisher'><label className='product__label'>Publisher: </label>{this.props.product.get('publisher')}</div>
        <div className='product__publishdate'><label className='product__label'>Publish Date: </label>{this.props.product.get('publishDate')}</div>
        <div className='product__pagecount'><label className='product__label'>Page Count: </label>{this.props.product.get('pageCount')}</div>
      	<div className='product__description'><label className='product__label'>Description: </label>{this.decodeHTMLEntities(this.props.product.get('description'))}</div>
      	<div className='product__price'><label className='product__label'>Price: </label>{this.formatPrice(this.props.product.get('price'))}</div>
        <div className='product__isbn'><label className='product__label'>ISBN: </label>{this.props.product.get('isbn')}</div>
      	<CartAddWidget products={this.state.products} cartItem={this.createCartItem(this.props.product.get('id'))} cartItems={this.state.cartItems}/>
      </div>
		);
	},
  componentWillReceiveProps: function(nextProps) {
    this.setState({cartItems: nextProps.cartItems});
    this.setState({products: nextProps.products});
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },
  getInitialState: function() {
    return {
      fulltext: '',
      cartItems: this.props.cartItems,
      products: this.props.products
    }
  },
  createCartItem: function(id) {
    var cartItem = new CartItem();
    cartItem.set('productId', id);
    return cartItem;
  },
  truncateString: function(length, string) {
    var substring = "";
    if (string) {
      substring = (string.length > length) ? string.substr(0, length - 1) + ' ...' : string;
    }
    return  substring;
  },
  toggleDescription: function() {
    if (this.state.fulltext) {
      this.setState({'fulltext': ''});
    } else {
      this.setState({'fulltext': 'fulltext'});
    }
  },
  decodeHTMLEntities: function (string) {
    if(string && typeof string === 'string') {
      string = string.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      string = string.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    }
    return string;
  },
  formatPrice: function(price) {
    var formattedPrice = '';
    if (price.length) {
      formattedPrice = '$' + this.props.product.get('price');
    }
    return formattedPrice;
  }
});