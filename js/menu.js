document.addEventListener('DOMContentLoaded', function() {
    // Menu Category Switching
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const currentCategoryText = document.getElementById('currentCategory');
    const categoryDropdownBtn = document.querySelector('.category-dropdown-btn');
    const categoryDropdownContent = document.querySelector('.category-dropdown-content');
    
    // Mobile dropdown toggle
    categoryDropdownBtn.addEventListener('click', function() {
        categoryDropdownContent.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.category-dropdown-btn') && 
            !event.target.matches('.category-dropdown-btn *')) {
            categoryDropdownContent.classList.remove('show');
        }
    });
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            menuSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const category = this.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
            
            // Update dropdown text for mobile
            const buttonText = this.textContent;
            currentCategoryText.textContent = buttonText;
            
            // Close dropdown after selection
            categoryDropdownContent.classList.remove('show');
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        menuItems.forEach(item => {
            const itemName = item.querySelector('.menu-item-name').textContent.toLowerCase();
            const itemDescription = item.querySelector('.menu-item-description').textContent.toLowerCase();
            
            if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show all sections when searching
        if (searchTerm.length > 0) {
            menuSections.forEach(section => section.classList.add('active'));
        } else {
            // Reset to only showing active section
            menuSections.forEach(section => section.classList.remove('active'));
            const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
            document.getElementById(activeCategory).classList.add('active');
        }
    });
    
    // Cart functionality
    const cartToggle = document.querySelector('.cart-toggle');
    const closeCart = document.querySelector('.close-cart');
    const cartContainer = document.querySelector('.cart-container');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cartEmpty = document.querySelector('.cart-empty');
    
    let cart = [];
    
    // Open cart
    cartToggle.addEventListener('click', function() {
        cartContainer.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    // Close cart
    closeCart.addEventListener('click', closeCartFunction);
    cartOverlay.addEventListener('click', closeCartFunction);
    
    function closeCartFunction() {
        cartContainer.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item-card');
            const itemName = menuItem.querySelector('.menu-item-name').textContent;
            const itemPrice = menuItem.querySelector('.menu-item-price span').textContent;
            const itemImage = menuItem.querySelector('.menu-item-image img').src;
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.name === itemName);
            
            if (existingItem) {
                existingItem.quantity++;
                updateCartItemUI(existingItem);
            } else {
                const newItem = {
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1
                };
                
                cart.push(newItem);
                addCartItemToUI(newItem);
            }
            
            updateCartTotal();
            updateCartCount();
            
            // Show cart after adding item
            cartContainer.classList.add('open');
            cartOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function addCartItemToUI(item) {
        // Hide empty cart message
        if (cart.length === 1) {
            cartEmpty.style.display = 'none';
        }
        
        const cartItemHTML = `
            <div class="cart-item" data-name="${item.name}">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
            </div>
        `;
        
        cartItems.insertAdjacentHTML('beforeend', cartItemHTML);
        
        // Add event listeners to new buttons
        const newCartItem = cartItems.querySelector(`.cart-item[data-name="${item.name}"]`);
        
        newCartItem.querySelector('.increase').addEventListener('click', function() {
            increaseQuantity(item.name);
        });
        
        newCartItem.querySelector('.decrease').addEventListener('click', function() {
            decreaseQuantity(item.name);
        });
        
        newCartItem.querySelector('.remove-item').addEventListener('click', function() {
            removeItem(item.name);
        });
    }
    
    function updateCartItemUI(item) {
        const cartItem = cartItems.querySelector(`.cart-item[data-name="${item.name}"]`);
        cartItem.querySelector('.quantity-value').textContent = item.quantity;
    }
    
    function increaseQuantity(itemName) {
        const item = cart.find(item => item.name === itemName);
        item.quantity++;
        updateCartItemUI(item);
        updateCartTotal();
    }
    
    function decreaseQuantity(itemName) {
        const item = cart.find(item => item.name === itemName);
        if (item.quantity > 1) {
            item.quantity--;
            updateCartItemUI(item);
        } else {
            removeItem(itemName);
        }
        updateCartTotal();
    }
    
    function removeItem(itemName) {
        cart = cart.filter(item => item.name !== itemName);
        const cartItem = cartItems.querySelector(`.cart-item[data-name="${itemName}"]`);
        cartItem.remove();
        
        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
        }
        
        updateCartTotal();
        updateCartCount();
    }
    
    function updateCartTotal() {
        let total = 0;
        cart.forEach(item => {
            const price = parseFloat(item.price.replace('₱', ''));
            total += price * item.quantity;
        });
        
        totalAmount.textContent = `₱${total.toFixed(0)}`;
    }
    
    function updateCartCount() {
        let count = 0;
        cart.forEach(item => {
            count += item.quantity;
        });
        
        cartCount.textContent = count;
    }
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Thank you for your order! Your items will be prepared shortly.');
            cart = [];
            cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
            updateCartTotal();
            updateCartCount();
            closeCartFunction();
        } else {
            alert('Your cart is empty. Please add items before checking out.');
        }
    });
});