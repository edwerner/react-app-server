import React from 'react';
import ReactDOM from 'react-dom';
import sass from '../scss/shop.scss';
import $ from 'jquery';
import Product from '../javascripts/product';
import ProductCollection from '../javascripts/products';
import {renderLoader, hideLoader} from './loader.jsx';
import {renderOverlayModal} from './overlay.jsx';
import ProductTile from './product-tile.jsx';
import Cart from './cart.jsx';

var Shop = React.createClass({
	render: function() {
		var products = this.props.products.models;
		console.log(products);
		console.log(typeof products);
	    if (!products) {
	        return null;
	    }
		return (
			<div>
			    {products.map(function(product) {
			        return <ProductTile product={product}/>;
			    })}
		    </div>
		);
	}
});


export function fetchProducts() {
	var productCollection = new ProductCollection();
    Backbone.emulateHTTP = true;
	// var promise = productCollection.fetch();
	// $.getJSON( "https://www.librarything.com/api_getdata.php?userid=timspalding&key=2652641547?callback=books", {
	// 	dataType: 'jsonp'
	// }).done(function(data) {
	// 	console.log(data);
	// }).fail(function(error) {
	// 	console.log(error);
	// });

	var productCollection = new ProductCollection();

	var promise = $.ajax({
	  method: "GET",
	  url: "https://www.librarything.com/api_getdata.php?userid=timspalding&key=2652641547",
	  dataType: "jsonp"
	});
	renderLoader();
	$.when(promise).done(function(data) {
		// console.log(data);
		hideLoader();
		var products = data.books;
		for (var product in products) {
		  // // console.log(book);
		  // console.log(products[product]["ISBN"]);
		  // console.log(products[product].ISBN);
		  // var product = new Product();
		  if (products[product]['ISBN'] != '') {
		  	fetchImageByIsbn(products[product]);
		  }
		}
		Backbone.history.navigate('shop', {trigger:true});
		// renderShopPage(productCollection);
	});
	$.when(promise).fail(function(error) {
		console.log(error);
		hideLoader();
    	renderOverlayModal('Error', error.message, false);
	});
}

export function fetchImageByIsbn(book) {

	// var xhr = new XMLHttpRequest();
	// xhr.open("GET", "/proxy/devices", false);
	// xhr.send();


	// var request = require("request");
	// app.get("/proxy/devices", function(req, res) {
	//     request("https://www.moovmanage.com/public_api/devices?api_key=foo", function(err, response, body) {
	//         if (err) res.send(err);
	//         res.send(body);
	//     });
	// });

	// var promise j= $.ajax({
	// 	type: 'GET',
	// 	url: 'http://www.barcodefinder.com/search?q=' + book['ISBN'] + '&format=json',
	// 	headers: {
 //       		Accept : "application/json; charset=utf-8",
	// 		'Content-Type':'application/json'
	// 	},
	// 	contentType: 'application/json',
	// 	dataType: 'json'
	// });
	// console.log(book['ISBN']);
	// $.when(promise).done(function(data) {
	// 	console.log(data);
	// 	product.setId(book['book_id']);
	// 	product.setTitle(book['title']);
	// });
	// $.when(promise).fail(function(data) {
	// 	console.log(error);
	// });

}
export function parseBarcode() {

}

// export function fetchProducts() {
// 	var productCollection = new ProductCollection();
//     Backbone.emulateHTTP = true;
// 	var promise = productCollection.fetch();
// 	renderLoader();
// 	$.when(promise).done(function(data) {
// 		hideLoader();
// 		Backbone.history.navigate('shop', {trigger:true});
// 		renderShopPage(productCollection);
// 	});
// 	$.when(promise).fail(function(error) {
// 		hideLoader();
//     	renderOverlayModal('Error', error.message, false);
// 	});
// }

export function renderShopPage(products) {
	ReactDOM.render(<Shop showLink='' products={products}/>, document.getElementById('shop__container'));
}

export function hideShopPage() {
	ReactDOM.render(<Shop showLink='hidden'/>, document.getElementById('shop__container'));
}	