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
      <!-- Sidebar content -->
      <a href="#"><img :src="userImage" style="height:100px" alt="Profile"></a>
      <a href="#">{{ userName }}</a>
      <hr style="color:grey; margin-left:2rem; margin-right:2rem;">
      <a href="https://polskoydm.pythonanywhere.com/user_register" v-if="!getCookie('email')">Join Us</a>
      <a href="https://polskoydm.pythonanywhere.com/user_login" v-if="!getCookie('email')">Messages</a>
      <a href="https://www.wheels.works/about">About</a>
      <a @click="logout" v-if="!getCookie('email')">Logout</a>
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
      userImage: "",
      userName: ""
    };
  },
  methods: {
    // Other methods
    
    setUserData() {
      const email = this.getCookie('email');
      const image = this.getCookie('image');
      const username = this.getCookie('username');
      
      this.userImage = image ? image : "https://example.com/fake-image.jpg";
      this.userName = username ? username : "Anonim User";
    },

    openNav() {
      document.getElementById("mySidenav").style.width = "100%";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    },
 
  },
  created() {
    this.setUserData();
  }
};
</script>
