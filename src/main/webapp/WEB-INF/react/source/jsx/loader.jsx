import React from 'react';
import ReactDOM from 'react-dom';
import sassLoader from '../scss/order.scss';
import loader from '../scss/loader.scss';

var Loader = React.createClass({
	render: function() {
		return (
			<div className={this.props.showLink ? 'hidden' : 'loader__image width__100 height__100'}>
				<div className='flex flex-center flex-vertical-center width__100 height__100'>
					<img src='../../../resources/images/loader.gif'/>
				</div>
			</div>
		);
	}
});

var loaderContainer = document.getElementById("loader__container");

export function hideLoader() {
	loaderContainer.className += ' hidden';
	ReactDOM.render(<Loader showLink='hidden'/>, document.getElementById('loader__container'));
}

export function renderLoader() {
	loaderContainer.className = loaderContainer.className.replace(/\hidden\b/,'');
	ReactDOM.render(<Loader  showLink=''/>, document.getElementById('loader__container'));
}