/*
 * Bloom & Gift - Main JavaScript
 * Contains core functionality for the flower shop website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Sample product data (in a real site, this would come from a database)
    const products = {
        1: {
            id: 1,
            title: 'Red Rose Bouquet',
            price: '$35.99',
            rating: 4.5,
            ratingCount: 42,
            description: 'A beautiful bouquet of fresh red roses, perfect for expressing love and appreciation. Each bouquet contains 12 premium long-stemmed roses arranged with greenery and baby\'s breath.',
            category: 'Anniversary, Romance',
            image: 'images/products/red-rose-bouquet.jpg',
            link: 'product-details.html?id=1'
        },
        2: {
            id: 2,
            title: 'Mixed Tulips',
            price: '$29.99',
            rating: 4.0,
            ratingCount: 28,
            description: 'A vibrant mix of colorful tulips that brings joy and brightness to any space. This arrangement features 15 tulips in various colors including red, yellow, pink, and purple.',
            category: 'Birthday, Spring',
            image: 'images/products/mixed-tulips.jpg',
            link: 'product-details.html?id=2'
        },
        3: {
            id: 3,
            title: 'Lavender Bouquet',
            price: '$39.99',
            rating: 5.0,
            ratingCount: 18,
            description: 'A soothing bouquet of fresh lavender, known for its calming scent and beautiful purple blooms. Each bouquet contains approximately 20 stems of premium lavender.',
            category: 'Sympathy, Relaxation',
            image: 'images/products/lavender-bouquet.jpg',
            link: 'product-details.html?id=3'
        },
        4: {
            id: 4,
            title: 'Sunflower Bouquet',
            price: '$32.99',
            rating: 4.0,
            ratingCount: 36,
            description: 'Bright and cheerful sunflowers arranged in a beautiful bouquet. Each arrangement contains 8 large sunflowers with greenery and accent flowers.',
            category: 'Celebration, Summer',
            image: 'images/products/sunflower-bouquet.jpg',
            link: 'product-details.html?id=4'
        }
    };

    // Open Quick View Modal
    if (quickViewBtns) {
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                const product = products[productId];
                
                if (product) {
                    document.getElementById('modalProductImage').src = product.image;
                    document.getElementById('modalProductTitle').textContent = product.title;
                    document.getElementById('modalProductPrice').textContent = product.price;
                    document.getElementById('modalProductDescription').textContent = product.description;
                    document.getElementById('modalProductCategory').textContent = product.category;
                    
                    // Set rating stars
                    const ratingHtml = generateRatingStars(product.rating) + `<span>(${product.ratingCount})</span>`;
                    document.getElementById('modalProductRating').innerHTML = ratingHtml;
                    
                    // Set view product link
                    document.querySelector('.view-product-btn').href = product.link;
                    
                    // Reset quantity to 1
                    document.getElementById('quantity').value = 1;
                    
                    // Open modal
                    quickViewModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });
    }

    // Close Quick View Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            quickViewModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    }

    // Close modal on outside click
    window.addEventListener('click', function(event) {
        if (event.target === quickViewModal) {
            quickViewModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });

    // Quantity controls
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }

    // Add to Cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart, .add-to-cart-btn');
    
    if (addToCartBtns) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                let productId, quantity = 1;
                
                // Check if button is in modal
                if (this.classList.contains('add-to-cart-btn')) {
                    productId = document.querySelector('.quick-view[data-product-id]').getAttribute('data-product-id');
                    quantity = parseInt(document.getElementById('quantity').value);
                } else {
                    productId = this.getAttribute('data-product-id');
                }
                
                addToCart(productId, quantity);
                
                // Show notification
                showNotification(`${products[productId].title} added to cart!`);
                
                // Close modal if open
                if (quickViewModal.style.display === 'block') {
                    quickViewModal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Enable scrolling
                }
                
                // Update cart count
                updateCartCount();
            });
        });
    }

    // Helper function to generate rating stars
    function generateRatingStars(rating) {
        let starsHtml = '';
        
        // Full stars
        for (let i = 1; i <= Math.floor(rating); i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        // Half star
        if (rating % 1 !== 0) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Empty stars
        for (let i = Math.ceil(rating); i < 5; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return starsHtml;
    }

    // Cart functionality
    function addToCart(productId, quantity) {
        // Get existing cart or initialize empty one
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product is already in cart
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            // Update quantity if already in cart
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                id: productId,
                quantity: quantity
            });
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update cart count
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Calculate total items in cart
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update cart count display
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }

    // Show notification
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Set message and show notification
        notification.textContent = message;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Initialize cart count on page load
    updateCartCount();
    
    // Handle payment method selection on checkout page
    const paymentMethodOptions = document.querySelectorAll('.payment-method-option');
    
    if (paymentMethodOptions) {
        paymentMethodOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                paymentMethodOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to selected option
                this.classList.add('active');
                
                // Show corresponding payment form
                const paymentMethod = this.getAttribute('data-payment-method');
                const paymentForms = document.querySelectorAll('.payment-form');
                
                paymentForms.forEach(form => {
                    if (form.getAttribute('data-payment-method') === paymentMethod) {
                        form.style.display = 'block';
                    } else {
                        form.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Handle delivery calculation for checkout page
    const deliveryOptions = document.querySelectorAll('input[name="delivery-option"]');
    const deliveryAddressContainer = document.getElementById('delivery-address-container');
    const regionSelect = document.getElementById('delivery-region');
    
    if (deliveryOptions && deliveryAddressContainer) {
        deliveryOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (this.value === 'delivery') {
                    deliveryAddressContainer.style.display = 'block';
                    calculateDeliveryCharge();
                } else {
                    deliveryAddressContainer.style.display = 'none';
                    updateOrderSummary(0); // Reset delivery charge
                }
            });
        });
    }
    
    if (regionSelect) {
        regionSelect.addEventListener('change', calculateDeliveryCharge);
    }
    
    // Calculate delivery charge based on selected region
    function calculateDeliveryCharge() {
        if (!regionSelect) return;
        
        const region = regionSelect.value;
        let deliveryCharge = 0;
        
        // Set delivery charge based on region (in a real system, this would come from a database)
        switch (region) {
            case 'harare-cbd':
                deliveryCharge = 5;
                break;
            case 'harare-suburbs':
                deliveryCharge = 8;
                break;
            case 'chitungwiza':
                deliveryCharge = 12;
                break;
            case 'bulawayo':
                deliveryCharge = 20;
                break;
            case 'other':
                deliveryCharge = 25;
                break;
            default:
                deliveryCharge = 0;
        }
        
        updateOrderSummary(deliveryCharge);
    }
    
    // Update order summary with new delivery charge
    function updateOrderSummary(deliveryCharge) {
        const deliveryChargeElement = document.getElementById('delivery-charge');
        const orderTotalElement = document.getElementById('order-total');
        
        if (deliveryChargeElement && orderTotalElement) {
            // Update delivery charge
            deliveryChargeElement.textContent = `$${deliveryCharge.toFixed(2)}`;
            
            // Get subtotal
            const subtotalText = document.getElementById('order-subtotal').textContent;
            const subtotal = parseFloat(subtotalText.replace('$', ''));
            
            // Calculate new total
            const total = subtotal + deliveryCharge;
            
            // Update total
            orderTotalElement.textContent = `$${total.toFixed(2)}`;
        }
    }
    
    // Money bouquet calculator functionality
    const moneyAmountInput = document.getElementById('money-amount');
    const currencySelect = document.getElementById('money-currency');
    const calculateBtn = document.getElementById('calculate-bouquet-price');
    const bouquetPriceResult = document.getElementById('bouquet-price-result');
    
    if (calculateBtn && moneyAmountInput && currencySelect && bouquetPriceResult) {
        calculateBtn.addEventListener('click', function() {
            const amount = parseFloat(moneyAmountInput.value);
            const currency = currencySelect.value;
            
            if (isNaN(amount) || amount <= 0) {
                bouquetPriceResult.textContent = 'Please enter a valid amount';
                bouquetPriceResult.style.color = 'red';
                return;
            }
            
            // Calculate price based on amount and currency
            // (in a real system, this would be more sophisticated)
            let baseFee = 15; // Base arrangement fee
            let percentageFee = 0;
            
            if (currency === 'usd') {
                percentageFee = amount * 0.10; // 10% of USD amount
            } else if (currency === 'zwl') {
                percentageFee = amount * 0.05; // 5% of ZWL amount
            }
            
            const totalPrice = baseFee + percentageFee;
            
            bouquetPriceResult.textContent = `Bouquet Price: $${totalPrice.toFixed(2)} (includes arrangement fee)`;
            bouquetPriceResult.style.color = 'var(--primary-color)';
        });
    }
}); 