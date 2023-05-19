<template>
  <div class="footer">
    <div class="footer-buttons">
      <a href="/" class="footer-button">
        <i class="fa-solid fa-house fa-lg"></i>
        <span class="footer-button-label">Home</span>
      </a>
   
      <a href="/saved" v-if="!userInfo" class="footer-button">
        <i class="fa-solid fa-calendar fa-lg"></i>
        <span class="footer-button-label">Saved</span>
      </a>
      <a href="/shoping_cart" class="footer-button" v-if="!userInfo">
        <i class="fa-solid fa-cart-shopping fa-lg"></i>
        <span class="footer-button-label">Cart</span>
        <span class="cart-counter">{{ cartItems.length }}</span>
      </a>
      <a href="https://polskoydm.pythonanywhere.com/user_login" v-if="userInfo" class="footer-button">
        <i class="fa-solid fa-calendar fa-lg"></i>
        <span class="footer-button-label">Saved</span>
      </a>
      <a href="https://polskoydm.pythonanywhere.com/user_login" class="footer-button" v-if="userInfo">
        <i class="fa-solid fa-cart-shopping fa-lg"></i>
        <span class="footer-button-label">Cart</span>
        <span class="cart-counter">{{ cartItems.length }}</span>
      </a>
      <a @click="openNav" class="footer-button">
        <i class="fa-solid fa-user fa-lg"></i>
        <span class="footer-button-label">Profile</span>
      </a>
    </div>
  </div>
  <div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
      <a href="#"><img :src="getUserImage()" style="height:100px" alt="Profile"></a>
      <a href="#">{{ getUserName() }}</a>
      <hr style="color:grey; margin-left:2rem; margin-right:2rem;">
      <a href="https://polskoydm.pythonanywhere.com/user_register" v-if="userInfo">Join Us</a>
      <a href="https://polskoydm.pythonanywhere.com/user_login" v-if="userInfo">Messages</a>
      <a href="https://www.wheels.works/about">About</a>
      <a @click="logout" v-if="!userInfo">Logout</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true
    },
  },

 
    
    // Other methods
    methods: {
      openNav() {
        document.getElementById("mySidenav").style.width = "100%";
      },
      closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      },
      logout() {
        // Implement logout functionality
      }
    },
    created() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');
  const image = urlParams.get('image');
  const username = urlParams.get('username');

  // Set the email, image, and username cookies
  this.setCookie('email', email);
  this.setCookie('image', image);
  this.setCookie('username', username);

  // Update the userInfo object with the email, image, and username values
  if (email) {
    this.userInfo.email = email;
  }
  if (image) {
    this.userInfo.image = image;
  }
  if (username) {
    this.userInfo.username = username;
  }
},
methods: {
  setCookie(name, value) {
    const cookie = `${name}=${value}`;
    document.cookie = cookie;
  },
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
}
  };
  </script>
