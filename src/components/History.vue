<!-- Orders.vue -->
<template>
    <div>
      <div v-for="order in orders" :key="order.id">
        <h3>Order ID: {{ order.id }}</h3>
        <ul>
          <li v-for="item in getCartItems(order)" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        orders: [],
      };
    },
    mounted() {
      const email = localStorage.getItem('email');
      if (email) {
        this.fetchOrders(email);
      }
    },
    methods: {
      fetchOrders(email) {
        // Send a GET request with the email as a query parameter
        axios.get('https://polskoydm.pythonanywhere.com/history', { params: { email } })
          .then(response => {
            // Assign the received data to the component's data property
            this.orders = response.data.orders;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },
      getCartItems(order) {
        // Extract the cart items for the given order
        const cartItems = data.cart_items.find(cart => cart.order_id === order.id);
        return cartItems || [];
      },
    },
  };
  </script>
  