<template>
    <div>
      <h1>Login Page</h1>
      <form @submit="login">
        <input type="email" v-model="email" placeholder="Email" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          // Initialize your form data properties
          // Example:
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      submitForm(event) {
        event.preventDefault();
        
        // Make a POST request to your backend API
        axios.post('https://polskoydm.pythonanywhere.com/user_login', this.formData)
          .then(response => {
            // Handle the response
            console.log(response.data);
          })
          .catch(error => {
            // Handle the error
            console.error(error);
          });
      }
    }
  };
  </script>