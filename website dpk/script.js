// Cart functionality
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');

// Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Initialize cart functionality
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // Remove items from cart
    const removeCartButtons = document.getElementsByClassName('cart-remove');
    for (let button of removeCartButtons) {
        button.addEventListener('click', removeCartItem);
    }

    // Update quantity in cart
    const quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let input of quantityInputs) {
        input.addEventListener('change', quantityChanged);
    }

    // Add to cart
    const addCartButtons = document.getElementsByClassName('buy-btn');
    for (let button of addCartButtons) {
        button.addEventListener("click", addCartClicked);
    }

    // Initial update of total price
    updateTotal();
}

// Remove item from cart
function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity changes
function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add to cart clicked
function addCartClicked(event) {
    const button = event.target;
    const shopProducts = button.closest('.product-box'); // Use closest to get the right parent
    const title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    const price = shopProducts.getElementsByClassName('price')[0].innerText.replace("Rp", "").replace(".", "").trim();
    const productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

// Add product to cart
function addProductToCart(title, price, productImg) {
    const cartItems = document.getElementsByClassName('cart-content')[0];
    const cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    
    // Check if item already exists
    for (let cartItem of cartItemsNames) {
        if (cartItem.innerText === title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    const cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    const cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">Rp${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Add event listeners for new items
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Update total price
function updateTotal() {
    const cartContent = document.getElementsByClassName('cart-content')[0];
    const cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;

    for (let cartBox of cartBoxes ) {
        const priceElement = cartBox.getElementsByClassName("cart-price")[0];
        const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        const price = parseFloat(priceElement.innerText.replace("Rp", "").replace(".", "").trim());
        const quantity = quantityElement.value;
        total += price * quantity;
    }

    // Format total as Rupiah
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    // Update the total price in the DOM
    document.getElementsByClassName("total-price")[0].innerText = formatter.format(total);
}


// Login form submission
document.querySelector('#loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '123') {
        window.location.href = 'index.html'; // Adjust path if necessary
    } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Invalid username or password.';
    }
});

// Password visibility toggle
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', () => {
    // Toggle password visibility
    const isPasswordVisible = passwordInput.type === 'text';
    passwordInput.type = isPasswordVisible ? 'password' : 'text';

    // Update button text
    togglePasswordButton.textContent = isPasswordVisible ? 'Show' : 'Hide';
});