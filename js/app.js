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

// cart
let cart = [];

// buttons
let buttonsDOM = [];


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
        products.forEach(product => {
            result += ` 
    		<!-- single product -->
			<article class="product">
				<div class="img-container">
					<img 
					src=${product.image} 
					alt="Product image" 
					class="product-img">
					<button class="bag-btn" data-id=${product.id}>
					<i class="fas fa-shopping-cart"></i> 
					add to bag
					</button>
				</div>
				<h3>${product.title}</h3>
				<h4>$${product.price}</h4>
			</article>
    		`;
        });

        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        // this will turn the buttons into arrays
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }

            button.addEventListener('click', (event) => {
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                // get products from products
                let cartItem = {...Storage.getProduct(id), amount:1};

                // add product to the cart
                cart = [...cart,cartItem];

                // save cart in local storage
                Storage.saveCart(cart);

                // set cart values
                this.setCartValues(cart);


                // display cart items
                // show the cart 
            });
        });
    }

    setCartValue(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
        console.log(cartTotal, cartItems);
    }
}
   
// local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProducts().then(products => {
        ui.displayProducts(products)
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
    });
});