<template>
    <div>
      <ul>
        <li v-for="order in orders" :key="order.id">
          <h3>Order ID: {{ order.id }}</h3>
          <p>Status: {{ order.status }}</p>
          <p>Items: {{ order.items.join(', ') }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [] // initialize an empty array to store the orders
      };
    },
    mounted() {
      this.fetchOrders(); // fetch orders when the component is mounted
    },
    methods: {
      fetchOrders() {
        // make an HTTP request to the '/history' endpoint
        fetch('https://polskoydm.pythonanywhere.com/history')
          .then(response => response.json())
          .then(data => {
            this.orders = data; // assign the retrieved data to the 'orders' array
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
      }
    }
  };
  </script>
  