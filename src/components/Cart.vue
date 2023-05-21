
<template>
  <div class="cart">
    <!-- Your existing code -->

    <div class="cart">
    <h2>Cart</h2>
    <div v-for="item in cartItems" :key="item.id" class="cart-item">
      <div class="cart-item-details">
        <div class="cart-item-left">
          <img :src="getImageUrl(item.image)" :alt="item.name" class="cart-item-image">
          <span class="cart-item-name">{{ item.name }} - ${{ item.price }}</span>
        </div>
        <div class="cart-item-right">
          <div class="cart-item-quantity">
            <button @click="decreaseQuantity(item)">-</button>
            <span class="cart-item-quantity-value">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <button @click="removeItem(item)" class="cart-item-delete">Delete</button>
        </div>
      </div>
    </div>
    <div class="cart-total">
      <span class="cart-total-text">Total: {{ getTotalPrice() }}</span>
      <button @click="checkout" class="checkout-button" :disabled="isCheckoutClicked">Checkout</button>

    </div>
  </div>





    <!-- Render the PayPal button after checkout -->
    <div v-if="isCheckoutClicked">
      <div class="paypal-button-container">
        <div id="paypal-button-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      isCheckoutClicked: false,
      // Other data properties
    };
  },

  
  
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    checkout() {
  // Check if checkout button was already clicked
  if (this.isCheckoutClicked) {
    return;
  }
  
  // Mark the checkout button as clicked
  this.isCheckoutClicked = true;
  
      // Retrieve address, email, and name from local storage
  const address = localStorage.getItem('address');
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('username');

  // Prepare the data for the order
  const orderData = {
    total: this.getTotalPrice(),
    address: address,
    email: email,
    name: name,
    cart: JSON.stringify(this.cartItems)
  };

  // Make an HTTP POST request to your backend API endpoint
  fetch('https://polskoydm.pythonanywhere.com/auth-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  .then(response => {
    if (response.ok) {
  // The order was successfully created
  response.json().then(function(data) {
    const totalPrice = data.total;
    const orderID = data.order_id;
   
    // Add the PayPal button rendering code here
    paypal.Buttons({
      createOrder: function(data, actions) {
        // Set up the transaction
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalPrice.toString()  // Call the getTotalPrice() function to calculate total price
              }
            }
          ]
        });
      },
      onApprove: function(data, actions) {
        // Redirect the user to the thank-you page with order details
        const redirectUrl = `https://polskoydm.pythonanywhere.com/redirect/?order=${orderID}&name=${name}&address=${address}&email=${email}`;
        // Perform the redirect here
        window.location.href = redirectUrl;
      }
    }).render('#paypal-button-container');
  });

  
      // Perform any additional actions or show a success message
    } else {
      // There was an error creating the order
      console.error('Error creating order');
      // Handle the error or show an error message
    }
  })




    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    getTotalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    getImageUrl(image) {
      return `https://polskoydm.pythonanywhere.com/static/uploads/${image}`;
    },
    removeItem(item) {
      const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
    }
    
  }
  
};
</script>





<style>
.cart-item-delete {
  margin-left: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
}

/* Mobile-friendly styles */
@media (max-width: 600px) {
  .cart {
    padding: 10px;
  }
  .cart h2 {
    font-size: 20px;
  }
  .cart-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    list-style-type: none; /* Remove list points */
  }
  .cart-item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .cart-item-left {
    display: flex;
    align-items: center;
  }
  .cart-item-image {
    width: 80px;
    height: auto;
    margin-right: 10px;
  }
  .cart-item-name {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .cart-item-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .cart-item-quantity {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .cart-item-quantity button {
    padding: 5px;
    font-size: 16px;
  }
  .cart-item-quantity-value {
    margin: 0 10px;
    font-size: 16px;
  }
  .cart-item-price {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.cart-total-text {
  font-weight: bold;
}

.checkout-button {
  
  cursor: pointer;
}
}
</style>
