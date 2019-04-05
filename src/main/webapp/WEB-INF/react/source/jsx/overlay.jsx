import React from 'react';
import ReactDOM from 'react-dom';
import sassLoader from '../scss/overlay.scss';
import {fetchProducts} from './shop.jsx';
import {hideLoader} from './loader.jsx';

var Overlay = React.createClass({
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
		return (
			<div className='flex flex-center flex-vertical-center height__100'>
				<div className='overlay__content form__width'>
					<div className='overlay__header flex flex-vertical-center flex-space-between'>
						<div className='overlay__title flex-start'>
							<h3>{this.props.title}</h3>
						</div>
						<div className={this.state.closeButtonHover ? 'overlay__close-button flex-end button-mouseenter' : 'overlay__close-button flex-end button-mouseleave'}
						onClick={this.onCloseModalClick} onMouseEnter={this.onCloseButtonMouseEnter} onMouseLeave={this.onCloseButtonMouseLeave}>
							<img className='overlay__close-button-image' src='../../../resources/images/close-button.svg'/>
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
  bindEnterKeyup: function() {
    var _this = this;
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        _this.onCloseModalClick();
        _this.restoreOverflow();
      }
    });
  },
	restoreOverflow: function() {
		$("body").removeClass('overflow-hidden');
	},
	onSuccessButtonClick: function() {
		hideOverlayModal();
		this.restoreOverflow();
		Backbone.history.navigate('shop', {trigger:true});
	},
	onFailureButtonClick: function() {
		hideOverlayModal();
		this.restoreOverflow();
    Backbone.history.navigate('login', {trigger:true});
	},
	onCloseModalClick: function() {
		hideOverlayModal();
		this.restoreOverflow();
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