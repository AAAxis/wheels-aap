
<template><h1>Login uou in</h1></template>
<script>
import { setCookie } from 'vue-cookie';

export default {
  created() {
    const params = new URLSearchParams(this.$route.fullPath);
    const email = params.get('email');
    const image = params.get('image');
    const username = params.get('username');

    if (email && image && username) {
      setCookie('email', email, 7); // Set the 'email' cookie with the provided value for 7 days
      setCookie('image', image, 7); // Set the 'image' cookie with the provided value for 7 days
      setCookie('username', username, 7); // Set the 'username' cookie with the provided value for 7 days

      this.$router.push('/dashboard'); // Redirect to the '/dashboard' route
    }
  }
}
</script>
