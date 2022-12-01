$(document).ready(function () {
	let productItem = [{
		productName: "Nike Dunk High Retro",
		price: "110.00",
		photo: "product-1.jpg"
	},
	{
		productName: "Nike TShirt - Black",
		price: "35.00",
		photo: "product-2.jpg"
	},
	{
		productName: "Adidas Gameday Stretch Fit Hat",
		price: "20.00",
		photo: "product-3.jpg"
	},
	{
		productName: "Black Camo Hooded Puffer Jacket",
		price: "60.00",
		photo: "product-4.jpg"
	},
	{
		productName: "Reebok Classics Shoes",
		price: "90.00",
		photo: "product-5.jpg"
	},
	{
		productName: "Adidas Casual Shoes - White",
		price: "90.00",
		photo: "product-6.jpg"
	},
	{
		productName: "Adidas Game and Go Pullover - Hoodie",
		price: "50.00",
		photo: "product-7.jpg"
	},
	{
		productName: "Nike Air Max 90 Hyperfuse Trainers",
		price: "100.00",
		photo: "product-8.jpg"
	},
	{
		productName: "Nike Club Fleece Hoodie Men's - Dark Grey",
		price: "50.00",
		photo: "product-9.png"
	},
	{
		productName: "Reebok Tom & Jerry Men's Hoodie",
		price: "50.00",
		photo: "product-10.jpg"
	},
	{
		productName: "Arsenal x TFL Pre-Match Jersey",
		price: "80.00",
		photo: "product-11.jpg"
	}];
	showProductGallery(productItem);
	showCartTable();
});

function addToCart(element) {
	let productParent = $(element).closest('div.product-item');

	let price = $(productParent).find('.price span').text();
	let productName = $(productParent).find('.productname').text();
	let quantity = $(productParent).find('.product-quantity').val();

	let cartItem = {
		productName: productName,
		price: price,
		quantity: quantity,
	};
	let cartItemJSON = JSON.stringify(cartItem);

	let cartArray = new Array();
	// If JavaScript Shopping Cart Session Is Not Empty
	if (sessionStorage.getItem('shopping-cart')) {
		cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
	}
	cartArray.push(cartItemJSON);

	let cartJSON = JSON.stringify(cartArray);
	sessionStorage.setItem('shopping-cart', cartJSON);
	showCartTable();
}

function emptyCart() {
	if (sessionStorage.getItem('shopping-cart')) {
		// Clear JavaScript SessionStorage By Index
		sessionStorage.removeItem('shopping-cart');
		showCartTable();
	}
}



function removeCartItem(index) {
	if (sessionStorage.getItem('shopping-cart')) {
		let shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		sessionStorage.removeItem(shoppingCart[index]);
		showCartTable();
	}
}

function showCartTable() {
	let cartRowHTML = "";
	let itemCount = 0;
	let grandTotal = 0;

	let price = 0;
	let quantity = 0;
	let subTotal = 0;

	if (sessionStorage.getItem('shopping-cart')) {
		let shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		itemCount = shoppingCart.length;

		//Iterate Javascript Shopping Cart Array
		shoppingCart.forEach(function (item) {
			let cartItem = JSON.parse(item);
			price = parseFloat(cartItem.price);
			quantity = parseInt(cartItem.quantity);
			subTotal = price * quantity

			cartRowHTML += "<tr>" +
				"<td>" + cartItem.productName + "</td>" +
				"<td class='text-right'>$" + price.toFixed(2) + "</td>" +
				"<td class='text-right'>" + quantity + "</td>" +
				"<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
				"</tr>";

			grandTotal += subTotal;
		});
	}

	$('#cartTableBody').html(cartRowHTML);
	$('#itemCount').text(itemCount);
	$('#totalAmount').text("$" + grandTotal.toFixed(2));
}


function showProductGallery(product) {
	//Iterate Javascript Shopping Cart Array
	let productHTML = "";
	product.forEach(function (item) {
		productHTML += '<div class="product-item">' +
			'<img src="product-images/' + item.photo + '">' +
			'<div class="productname">' + item.productName + '</div>' +
			'<div class="price">$<span>' + item.price + '</span></div>' +
			'<div class="cart-action">' +
			'<input type="text" class="product-quantity" name="quantity" value="1" size="2" />' +
			'<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />' +
			'</div>' +
			'</div>';
		"<tr>";

	});
	$('#product-item-container').html(productHTML);
}
