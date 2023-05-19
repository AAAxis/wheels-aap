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
      <a href="#"><img :src="userInfo.image" style="height:100px" alt="Profile"></a>
      <a href="#">{{ userInfo.username }}</a>
      <hr style="color:grey; margin-left:2rem; margin-right:2rem;">
      <a href="https://polskoydm.pythonanywhere.com/user_register" v-if="userInfo">Join Us</a>
      <a href="https://polskoydm.pythonanywhere.com/user_login" v-if="userInfo">Messages</a>
      <a href="https://www.wheels.works/about">About</a>
      <a  @click="logout" v-if="!userInfo">Logout</a>
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
  data() {
    return {
      userInfo: {
        // Provide default values or fetch from JSON
        username: "Anonim User",
        image: "https://hips.hearstapps.com/hmg-prod/images/domestic-cat-lies-in-a-basket-with-a-knitted-royalty-free-image-1592337336.jpg?crop=0.668xw:1.00xh;0.247xw,0&resize=1120:*"
      }
    };
  },
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
  }
};
</script>