function loadCart() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear previous items in the cart list
    cartList.innerHTML = '';

    // Initialize total cost
    let totalCost = 0;

    // Check if the cart is empty
    if (cartItems.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your cart is empty!';
        cartList.appendChild(emptyMessage);
        cartTotal.textContent = 'Total: ₹0.00';
        return;
    }

    // Loop through cart items and create list elements
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');

        // Create an image element for the product
        const itemImage = document.createElement('img');
        itemImage.src = item.image;  // Image path from the cart item
        itemImage.alt = item.name;
        itemImage.style.width = '60px';  // Set width
        itemImage.style.height = 'auto'; // Maintain aspect ratio

        // Create a text element for product name and price
        const itemText = document.createElement('p');
        itemText.textContent = `${item.name} - ₹${item.price.toFixed(2)} (Quantity: ${item.quantity || 1})`;

        // Create a button to increase the quantity
        const increaseQuantityButton = document.createElement('button');
        increaseQuantityButton.textContent = '+';
        increaseQuantityButton.onclick = () => updateQuantity(index, 1);  // Increase quantity

        // Create a button to decrease the quantity
        const decreaseQuantityButton = document.createElement('button');
        decreaseQuantityButton.textContent = '-';
        decreaseQuantityButton.onclick = () => updateQuantity(index, -1);  // Decrease quantity

        // Create an "X" button to remove the item
        const removeButton = document.createElement('span');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-item');
        removeButton.onclick = () => removeItem(index);  // Remove item

        // Create a container for quantity controls
        const quantityContainer = document.createElement('div');
        quantityContainer.classList.add('quantity-container');
        quantityContainer.appendChild(decreaseQuantityButton);
        quantityContainer.appendChild(increaseQuantityButton);

        // Append elements to the list item
        listItem.appendChild(removeButton);  // "X" for item removal
        listItem.appendChild(itemImage);     // Product image
        listItem.appendChild(itemText);      // Product details
        listItem.appendChild(quantityContainer);  // Quantity controls
        
        // Append the list item to the cart list
        cartList.appendChild(listItem);

        // Calculate and update total cost
        totalCost += item.price * (item.quantity || 1);
    });

    // Display total cost in the cart
    cartTotal.textContent = `Total: ₹${totalCost.toFixed(2)}`;
}

// Function to update the quantity of items in the cart
function updateQuantity(index, change) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[index].quantity = (cartItems[index].quantity || 1) + change;

    // Ensure the quantity doesn't go below 1
    if (cartItems[index].quantity < 1) {
        cartItems[index].quantity = 1;
    }

    // Save the updated cart items back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Reload the cart to reflect changes
    loadCart();
}

// Function to remove an item from the cart
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);  // Remove the item from the array

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Reload the cart
    loadCart();
}
