<template>
    <!-- Default component -->
    <component :is="currentComponent"></component>

  <div class="footer">
    <div class="footer-buttons">
      <a @click="showComponent('Dashboard')" class="footer-button">
        <i class="fa-solid fa-house fa-lg"></i>
        <span class="footer-button-label">Home</span>
      </a>
   
      <a @click="showComponent('History')" class="footer-button">
        <i class="fa-solid fa-history fa-lg"></i>
  <span class="footer-button-label">Orders</span>
      </a>
      <a @click="showComponent('Cart')" class="footer-button">
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
import Cart from './Cart.vue';
import History from './History.vue';
import Dashboard from './Dashboard.vue';
export default {
  components: {
    Cart,
    History,
    Dashboard
  },
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentComponent: 'Dashboard', // Set default component here
      userImage: "",
      userName: "",
      userEmail: ""
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
    },
    setUserData() {
      this.userEmail = localStorage.getItem('email');
      this.userImage = localStorage.getItem('image');
      this.userName = localStorage.getItem('username');
    }
  },
  created() {
    this.setUserData();
  }
};
</script>
