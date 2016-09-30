import React from 'react';
import ReactDOM from 'react-dom';
import loader from '../scss/loader.scss';

var Loader = React.createClass({
	render: function() {
		return (
			<div className={this.props.showLink ? 'hidden' : 'loader__image'}>
				<img src='../../../resources/images/loader.gif'/>
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