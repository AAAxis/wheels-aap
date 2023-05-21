<template>
  <div class="cart">
    <h2>Cart</h2>
    <div v-for="item in cartItems" :key="item.id" class="cart-item">
      <div class="cart-item-details">
        <div class="cart-item-left">
          <img :src="getImageUrl(item.image)" :alt="item.name" class="cart-item-image">
          <span class="cart-item-name">{{ item.name }}</span>
        </div>
        <div class="cart-item-right">
          <div class="cart-item-quantity">
            <button @click="decreaseQuantity(item)">-</button>
            <span class="cart-item-quantity-value">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <span class="cart-item-price">{{ item.price }}</span>
          <button @click="removeItem(item)" class="cart-item-delete">Delete</button>
        </div>
      </div>
    </div>
    <div class="cart-total">Total: {{ getTotalPrice() }}</div>
    <button @click="checkout" class="checkout-button">Checkout</button>
  </div>
</template>

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
    font-size: 18px;
    margin-top: 10px;
  }
  .checkout-button {
    padding: 10px 20px;
    font-size: 18px;
  }
}
</style>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    checkout() {
      // Implement checkout functionality
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
