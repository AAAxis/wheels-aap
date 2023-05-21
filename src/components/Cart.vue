<template>
  <div class="cart">
    <h2>Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        <div class="cart-item">
          <img :src="getImageUrl(item.image)" :alt="item.name" class="cart-item-image">
          <div class="cart-item-details">
            <span class="cart-item-name">{{ item.name }}</span>
            <div class="cart-item-quantity">
              <button @click="decreaseQuantity(item)">-</button>
              <span class="cart-item-quantity-value">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
          </div>
          <span class="cart-item-price">{{ item.price }}</span>
          <button @click="removeItem(item)" class="cart-item-delete">Delete</button>
        </div>
      </li>
    </ul>
    <div class="cart-total">Total: {{ getTotalPrice() }}</div>
    <button @click="checkout">Checkout</button>
  </div>
</template>

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

<style>
/* Your existing style code */

.cart-item-delete {
  margin-left: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
}
</style>
