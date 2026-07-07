// ==============================
// FoodHub Restaurant System
// Part 1
// ==============================

// Elements
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
const search = document.getElementById("search");
const addButtons = document.querySelectorAll(".add-btn");
const foodCards = document.querySelectorAll(".food-card");

// Cart Array
let cart = [];

// ==============================
// Open Cart
// ==============================

cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

// ==============================
// Close Cart
// ==============================

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// ==============================
// Search Food
// ==============================

search.addEventListener("keyup", () => {

    let value = search.value.toLowerCase();

    foodCards.forEach((card) => {

        let foodName = card.querySelector("h3").textContent.toLowerCase();

        if (foodName.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// ==============================
// Add To Cart
// ==============================

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.parentElement;

        const name = card.querySelector("h3").textContent;

        const price = Number(
            card.querySelector(".price").textContent.replace("$", "")
        );

        addItem(name, price);

    });

});

// ==============================
// Add Item Function
// ==============================

function addItem(name, price) {

    const item = cart.find(product => product.name === name);

    if (item) {

        item.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

}
// ==============================
// Update Cart
// ==============================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        const cartBox = document.createElement("div");

        cartBox.classList.add("cart-item");

        cartBox.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>$${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQty(${index})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

            </div>

            <button onclick="removeItem(${index})">
                Remove
            </button>

        `;

        cartItems.appendChild(cartBox);

    });

    totalPrice.textContent = total;
    cartCount.textContent = count;

}

// ==============================
// Increase Quantity
// ==============================

function increaseQty(index){

    cart[index].quantity++;

    updateCart();

}

// ==============================
// Decrease Quantity
// ==============================

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

}

// ==============================
// Remove Item
// ==============================

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}
// ==============================
// Checkout
// ==============================

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    alert("🎉 Thank you for your order!\n\nYour order has been placed successfully.");

    cart = [];

    updateCart();

    saveCart();

    cartSidebar.classList.remove("active");

});

// ==============================
// Save Cart
// ==============================

function saveCart(){

    localStorage.setItem("foodhub-cart", JSON.stringify(cart));

}

// ==============================
// Load Cart
// ==============================

function loadCart(){

    const savedCart = localStorage.getItem("foodhub-cart");

    if(savedCart){

        cart = JSON.parse(savedCart);

        updateCart();

    }

}

// ==============================
// Save Automatically
// ==============================

const oldUpdateCart = updateCart;

updateCart = function(){

    oldUpdateCart();

    saveCart();

};

// ==============================
// Page Load
// ==============================

window.addEventListener("load", () => {

    loadCart();

});

// ==============================
// Contact Form
// ==============================

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    alert("✅ Thank you! Your message has been sent successfully.");

    contactForm.reset();

});