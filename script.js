// Function to add item to cart and save to localStorage
function addToCart(itemName, itemPrice) {
    // Get cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Create the new item object
    const newItem = {
        name: itemName,
        price: itemPrice
    };

    // Add the new item to the cart array
    cartItems.push(newItem);

    // Update localStorage with the new cart items
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update cart count in the header
    updateCartCount();
}

// Function to update the cart item count in the header
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.getElementById('cart-count').textContent = cartItems.length;
}

// Call this function to update the cart count on page load
window.onload = updateCartCount;
