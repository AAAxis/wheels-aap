<template>
    <div>
      <ul>
        <li v-for="order in orders" :key="order.id">
          <h3>Order ID: {{ order.id }}</h3>
          <p>Status: {{ order.status }}</p>
          <p>Total: {{ order.total }}</p>
          <p>Address: {{ order.address }}</p>
          <p>Email: {{ order.email }}</p>
          <p>Name: {{ order.name }}</p>
          <p>Cart:</p>
          <ul>
            <li v-for="item in order.cart" :key="item.id">
              {{ item.name }} x {{ item.quantity }}
            </li>
          </ul>
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
      const email = localStorage.getItem('email'); // Retrieve the email from local storage
      if (email) {
        this.fetchOrders(email); // fetch orders with the provided email
      } else {
        console.error('Email not found in local storage');
      }
    },
    methods: {
      fetchOrders(email) {
        // make an HTTP request to the '/history' endpoint with the email as a query parameter
        fetch(`https://polskoydm.pythonanywhere.com//history?email=${email}`)
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