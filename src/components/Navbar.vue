<template>
  <div class="footer">
    <div class="footer-buttons">
      <a href="/" class="footer-button">
        <i class="fa-solid fa-house fa-lg"></i>
        <span class="footer-button-label">Home</span>
      </a>
   
      <a href="/saved" v-if="!getCookie('email')" class="footer-button">
        <i class="fa-solid fa-calendar fa-lg"></i>
        <span class="footer-button-label">Saved</span>
      </a>
      <a href="/shoping_cart" class="footer-button" v-if="!getCookie('email')">
        <i class="fa-solid fa-cart-shopping fa-lg"></i>
        <span class="footer-button-label">Cart</span>
        <span class="cart-counter">{{ cartItems.length }}</span>
      </a>
      <a href="https://polskoydm.pythonanywhere.com/user_login" v-if="getCookie('email')" class="footer-button">
        <i class="fa-solid fa-calendar fa-lg"></i>
        <span class="footer-button-label">Saved</span>
      </a>
      <a href="https://polskoydm.pythonanywhere.com/user_login" class="footer-button" v-if="getCookie('email')">
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
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
      <a href="#"><img :src="userImage" style="height:100px" alt="Image"></a>
      <a href="#">{{ userName }}</a>
      <hr style="color:grey; margin-left:2rem; margin-right:2rem;">
      <a href="https://polskoydm.pythonanywhere.com/user_register">Join Us</a>
      <a href="https://polskoydm.pythonanywhere.com/user_login" >Messages</a>
      <a href="https://www.wheels.works/about" >About</a>
      <a @click="logout">Logout</a>
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
      userName: "",
      userEmail: ""
    };
  },
  methods: {
  // Other methods
  
  openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  },
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  },
  logout() {
    // Implement logout functionality
  },
  getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }

    return null;
  },
  setUserData() {
    this.userEmail = this.getCookie('email');
    this.userImage = this.getCookie('image');
    this.userName = this.getCookie('username');
  }
},
  created() {
    this.setUserData();
  }

   

};
</script>