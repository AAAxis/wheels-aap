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
        axios
          .get('https://polskoydm.pythonanywhere.com/history', { params: { email } })
          .then(response => {
            // Assign the received data to the component's data property
            this.orders = response.data.orders;
          })
          .catch(error => {
            if (error.response) {
              // Handle the error when a response with a non-2xx status code is received
              console.error('Error:', error.response.data.message);
            } else {
              // Handle other types of errors
              console.error('Error:', error.message);
            }
          });
      },
      getCartItems(order) {
        // Extract the cart items for the given order
        const cartItems = order.cart_items;
        return cartItems || [];
      },
    },
  };
  </script>
  