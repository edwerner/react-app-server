import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/overlay.scss';
import {fetchProducts} from './shop.jsx';
import {hideLoader} from './loader.jsx';

var Overlay = React.createClass({
  getInitialState: function() {
    return {
      closeButtonHover: ''
    }
  },
	render: function() {
		return (
			<div className='flex flex-vertical-center border-radius'>
				<div className='overlay__content form__width'>
					<div className='overlay__header flex flex-vertical-center flex-space-between'>
						<div className='overlay__title flex-start'>
							<h3>{this.props.title}</h3>
						</div>
						<div className={this.state.closeButtonHover ? 'overlay__close-button flex-end button-mouseenter' : 'overlay__close-button flex-end button-mouseleave'}
						onClick={this.onCloseModalClick} onMouseEnter={this.onCloseButtonMouseEnter} onMouseLeave={this.onCloseButtonMouseLeave}>
							<img className='overlay__close-button-image' src='../images/close-button.svg'/>
						</div>
					</div>
					<div className={this.props.success ? 'overlay__start flex flex-column flex-center flex-vertical-center' : 'hidden'}>
						<div className='overlay__message'>{this.props.message}</div>
						<div className='overlay__start-button-wrapper'>
							<button className='overlay__start-button btn btn-primary' onClick={this.onSuccessButtonClick}>Okay</button>
						</div>
					</div>
					<div className={!this.props.success ? 'overlay__start flex flex-column flex-center flex-vertical-center' : 'hidden'}>
						<div className='overlay__message'>{this.props.message}</div>
						<div className='overlay__start-button-wrapper'>
							<button className='overlay__start-button btn btn-primary' onClick={this.onFailureButtonClick}>Try Again</button>
						</div>
					</div>
				</div>
				<div className={this.props.showLink ? 'hidden' : 'overlay width__100 height__100'}></div>
			</div>		
		);
	},
	onSuccessButtonClick: function() {
		var token = window.localStorage.getItem('shop-token');
		if (token) {
			routeToShopPage();
		} else {
    	Backbone.history.navigate('login', {trigger:true});
    	hideOverlayModal();
		}
	},
	onFailureButtonClick: function() {
    Backbone.history.navigate('login', {trigger:true});
		hideOverlayModal();
	},
	onCloseModalClick: function() {
		hideOverlayModal();
	},
	onCloseButtonMouseEnter: function() {
		this.setState({'closeButtonHover': 'mouseenter'});
	},
	onCloseButtonMouseLeave: function() {
		this.setState({'closeButtonHover': ''});
	}
});

var overlayContainer = document.getElementById("overlay__container");

export function renderOverlayModal(title, message, success) {
	overlayContainer.className = overlayContainer.className.replace(/\hidden\b/,'');
  ReactDOM.render(<Overlay showLink='' title={title} message={message} success={success}/>, overlayContainer);
}

export function hideOverlayModal() {
	overlayContainer.className += ' hidden';
	ReactDOM.render(<Overlay showLink='hidden'/>, overlayContainer);
}

export function routeToShopPage() {
	var token = window.localStorage.getItem('shop-token');
	var promise = $.ajax({
	  type: 'GET',
	  url: '/shop',
	  dataType: 'json',
	  data: {
	   	token: token
	  }
	});
  $.when(promise).done(function() {
  	hideOverlayModal();
		Backbone.history.navigate('shop', {trigger:true});
		fetchProducts();
  });
  $.when(promise).fail(function(error) {
 		renderOverlayModal('Error', error.responseJSON.message, null);
  });
}