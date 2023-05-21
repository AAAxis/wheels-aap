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
        </div>
      </li>
    </ul>
    <div class="cart-total">Total: {{ getTotalPrice() }}</div>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {

  getImageUrl(image) {
      return `https://polskoydm.pythonanywhere.com/static/uploads/${image}`;
    },

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
    }
  }
};
</script>

<style>
.cart {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
}

.cart h2 {
  margin-top: 0;
}

.cart ul {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.cart-item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-name {
  font-weight: bold;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
}

.cart-item-quantity button {
  width: 25px;
  height: 25px;
  background-color: #ccc;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.cart-item-quantity-value {
  margin: 0 10px;
}

.cart-item-price {
  font-weight: bold;
}

.cart-total {
  font-weight: bold;
  margin-top: 10px;
}

.cart button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
