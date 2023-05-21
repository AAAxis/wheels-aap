<!-- Orders.vue -->
<template>
    <div>
      <div v-for="order in orders" :key="order.id">
        <h3>Order ID: {{ order.id }}</h3>
        <ul>
          <li v-for="item in order.cart_items" :key="item">{{ item }}</li>
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
      this.fetchOrders();
    },
    methods: {
      fetchOrders() {
        axios
          .get('https://polskoydm.pythonanywhere.com/history')
          .then(response => {
            this.orders = response.data.orders;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },
    },
  };
  </script>
  