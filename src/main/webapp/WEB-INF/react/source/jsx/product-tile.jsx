var React = require('react');
var CartAddWidget = require('./cart-add-widget.jsx');
var CartItem = require('../javascripts/cart-item');
import {renderProductDetails} from './product-details.jsx';

var ProductTile = React.createClass({
  getInitialState: function() {
    return {
      closeButtonHover: ''
    }
  },
	render: function() {
    var image = this.props.product.get('image');
    var title = this.props.product.get('title');
    var subtitle = this.props.product.get('subtitle');
    var author = this.props.product.get('author');
    // var isbn = this.props.product.get('isbn');
    // var publishDate = this.props.product.get('publishDate');
    // var language = this.props.product.get('language');
    // var price = this.props.product.get('price');
    // var description = this.props.product.get('description');
    // var genre = this.props.product.get('genre');
    // var pageCount = this.props.product.get('pageCount');
    // var publisher = this.props.product.get('publisher');
		return(			
     	<div className='product__tile'>
        <div onClick={this.showProductDetails}
        onMouseEnter={this.onProductImageMouseEnter}
        onMouseLeave={this.onProductImageMouseLeave} className={image ? 'product__title' : 'hidden'}>
          <div className={this.state.closeButtonHover ? 'product__image product__image-hover' : 'hidden'}>
            <img className='product__image product__details-image' src='../../../../resources/images/view-product-details.jpg'/>
          </div>
          <div className={!this.state.closeButtonHover ? 'product__image' : 'hidden'}>
            <img className='product__image' src={image}/>
          </div>
        </div>
        <div className={title ? 'product__title' : 'hidden'}>
          <h3>{title}</h3>
        </div>
        <div className={subtitle ? 'product__subtitle': 'hidden'}>
          <label>{subtitle}</label> 
        </div>
        <div className={author ? 'product__author': 'hidden'}>
          <label>{author}</label> 
        </div>
      	<CartAddWidget products={this.state.products} cartItem={this.createCartItem(this.props.product.get('id'))} cartItems={this.state.cartItems}/>
      </div>
		);
	},
  onProductImageMouseEnter: function() {
    this.setState({'closeButtonHover': 'mouseenter'});
  },
  onProductImageMouseLeave: function() {
    this.setState({'closeButtonHover': ''});
  },
  showProductDetails: function() {
      renderProductDetails(this.props.product);
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

 export default ProductTile;