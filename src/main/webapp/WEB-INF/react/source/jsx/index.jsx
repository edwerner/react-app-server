import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/index.scss';

var Index = React.createClass({
	render: function() {
		return (
			<div className={this.props.showLink ? 'hidden' : 'flex flex-vertical-center flex-column'}>
	      		<h1>Shopping Cart</h1>
	      		<p>This is a shopping cart app build with React.js</p>
	      		<img src='../../../../resources/images/shopping-cart-small.png'/>
			</div>
		);
	}
});

export function renderIndex() {
	ReactDOM.render(<Index showLink=''/>, document.getElementById('index'));
}

export function hideIndex() {
	ReactDOM.render(<Index showLink='hidden'/>, document.getElementById('index'));
}