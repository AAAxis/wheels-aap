<template>
  <div class="cart">
    <h2>Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - {{ item.price }}
      </li>
    </ul>
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
    }
  }
};
</script>