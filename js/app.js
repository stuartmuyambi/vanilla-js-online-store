// variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

// Cart
let cart = [];

// getting the products
class Products {
    async getProducts() {
        try {
            // adding the path to the products page
            let result = await fetch('../products.json'); // added semi colon
            let data = await result.json();


            let products = data.items;
            products = products.map(item => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image };
            });

            return products;
        } catch (error) {
            console.log(errors);
        }
    }
}

// display products
class UI {
    displayProducts(products) {
    	let result = '';
    }
}

// local storage
class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProducts().then(products => ui.displayProducts(products));
});