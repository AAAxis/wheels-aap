<template>
  <div id="app">
    <div class="navbar">
      <a @click="showComponent('Dashboard')" class="navbar-link">
        <i class="fa-solid fa-house fa-lg"></i>
        <span class="navbar-link-label">Home</span>
      </a>
  
      <a @click="showComponent('History')" class="navbar-link">
        <i class="fa-solid fa-history fa-lg"></i>
        <span class="navbar-link-label">Orders</span>
      </a>
  
      <a @click="showComponent('Cart')" class="navbar-link">
        <i class="fa-solid fa-cart-shopping fa-lg"></i>
        <span class="navbar-link-label">Cart</span>
        <span class="cart-items-count">{{ cartItems.length }}</span>
      </a>
  
      <a @click="openNav" class="navbar-link">
        <i class="fa-solid fa-user fa-lg"></i>
        <span class="navbar-link-label">Profile</span>
      </a>
  
      <!-- Rest of the Navbar content -->
    </div>
  
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
  
    <Dashboard v-if="currentComponent === 'Dashboard'" :cartItems="cartItems" @cart-updated="updateCartItems" />
    <History v-if="currentComponent === 'History'" />
    <Cart v-if="currentComponent === 'Cart'" :cartItems="cartItems" />
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
  data() {
    return {
      userImage: '',
      userName: '',
      userEmail: '',
      currentComponent: 'Dashboard',
      cartItems: [] // Initialize with an empty array or with actual cart items
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
    showComponent(component) {
      this.currentComponent = component;
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
