import React from 'react';
import ReactDOM from 'react-dom';
import CartAddWidget from './cart-add-widget.jsx';
import CartItem from '../javascripts/cart-item';

var ProductDetails = React.createClass({
  getInitialState: function() {
    return {
      closeButtonHover: ''
    }
  },
  componentWillMount: function() {
    $("body").addClass('overflow-hidden');
    this.bindEnterKeyup();
  },
	render: function() {
    if (!this.props.product) {
      return null;
    }
    var image = this.props.product.get('image');
    var title = this.props.product.get('title');
    var subtitle = this.props.product.get('subtitle');
    var author = this.props.product.get('author');
    var isbn = this.props.product.get('isbn');
    var publishDate = this.props.product.get('publishDate');
    var language = this.props.product.get('language');
    var price = this.props.product.get('price');
    var description = this.props.product.get('description');
    var genre = this.props.product.get('genre');
    var pageCount = this.props.product.get('pageCount');
    var publisher = this.props.product.get('publisher');
	return(
     	<div className='product__details__tile flex flex-center flex-vertical-center height__100'>  
        <div className='product__details-wrapper flex-vertical-center flex-column'> 
          <div className={this.state.closeButtonHover ? 'overlay__close-button flex-end button-mouseenter' : 'overlay__close-button flex-end button-mouseleave'}
          onClick={this.onCloseModalClick} onMouseEnter={this.onCloseButtonMouseEnter} onMouseLeave={this.onCloseButtonMouseLeave}>
            <img className='overlay__close-button-image' src='../../../resources/images/close-button.svg'/>
          </div>
          <div onClick={this.showProductDetails} className={image ? 'product__title' : 'hidden'}>
            <img className='product__image' src={image}/>
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
          <div className={isbn ? 'product__isbn' : 'hidden'}>
            <label>ISBN &nbsp;</label> 
            {isbn}
          </div>
          <div className={publishDate ? 'product__publishdate' : 'hidden'}>
            <label>Publish Date &nbsp;</label> 
            {publishDate}
          </div>
          <div className={language ? 'product_language' : 'hidden'}>
            <label> Language &nbsp;</label> 
            {language}
          </div>
          <div className={price ? 'product__price' : 'hidden'}>
            <label>Price &nbsp;</label> 
            {price}
          </div>
          <div className={description ? 'hidden' : 'product__description'}>
            <label>Description &nbsp;</label> 
            {description}
          </div>
          <div className={genre ? 'product__genre' : 'hidden'}>
            <label>Genre &nbsp;</label> 
            {genre}
          </div>
          <div className={pageCount ? 'product__pagecount' : 'hidden'}>
            <label>Page Count&nbsp;</label> 
            {pageCount}
          </div>
          <div className={publisher ? 'product__publisher' : 'hidden'}>
            <label>Publisher&nbsp;</label> 
            {publisher}
          </div>
        </div>
      </div>
		);
	},
  bindEnterKeyup: function() {
    var _this = this;
    $(document).keyup(function(e) {
      if (e.keyCode === 13) {
        _this.onCloseModalClick();
      }
    });
  },
	onCloseModalClick: function() {
		hideProductDetails();
    $("body").removeClass('overflow-hidden');
	},
	onCloseButtonMouseEnter: function() {
		this.setState({'closeButtonHover': 'mouseenter'});
	},
	onCloseButtonMouseLeave: function() {
		this.setState({'closeButtonHover': ''});
	}
  // componentWillReceiveProps: function(nextProps) {
  //   this.setState({cartItems: nextProps.cartItems});
  //   this.setState({products: nextProps.products});
  // },
  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }
});

var productDetailsContainer = document.getElementById('product__details__container');

export function renderProductDetails(product) {
	productDetailsContainer.className = productDetailsContainer.className.replace(/\hidden\b/,'');
  ReactDOM.render(<ProductDetails showLink='' product={product}/>, productDetailsContainer);
}

export function hideProductDetails() {
	productDetailsContainer.className += ' hidden';
  ReactDOM.render(<ProductDetails showLink='hidden'/>, productDetailsContainer);
}