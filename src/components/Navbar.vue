<template>


    <Dashboard v-if="currentComponent === 'Dashboard'" :cartItems="cartItems" @cart-updated="cartItems = $event" />
 <History v-if="currentComponent === 'History'" />
    <Cart v-if="currentComponent === 'Cart'" :cartItems="cartItems" />

    <div class="footer">
<div class="footer-buttons">
    <a @click="openNav" class="footer-button">
        <i class="fa-solid fa-user fa-lg"></i>
        <span class="footer-button-label">Profile</span>
      </a>

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
  
    </div>

  </div>
  
      <!-- Rest of the Navbar content -->

  
    <div id="mySidenav" class="sidenav">
      <!-- Sidebar content -->
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
      <a href="#"><img :src="userImage" style="height:100px" alt="Image"></a>
      <a href="#">{{ userName }}</a>
      <hr style="color:grey; margin-left:2rem; margin-right:2rem;">
      <a>{{ userAddress }}</a>
      <a>{{ userMobile }}</a>
      <a href="#">Edit Profile</a>
      <a @click="logout">Logout</a>
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
      userMobile: '',
      userAddress: '',
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
      // Clear the user data from local storage
      localStorage.removeItem('email');
      localStorage.removeItem('image');
      localStorage.removeItem('username');
      localStorage.removeItem('address');
      localStorage.removeItem('mobile');

      // Redirect to the login page
      window.location.href = 'https://polskoydm.pythonanywhere.com/user_login';
    },
    showComponent(component) {
      if (component === 'Cart' && this.cartItems.length === 0) {
        return; // Block moving to the Cart component if the cart is empty
      }
      this.currentComponent = component;
    },
    setUserData() {
      this.userEmail = localStorage.getItem('email');
      this.userImage = localStorage.getItem('image');
      this.userName = localStorage.getItem('username');
      this.userAddress = localStorage.getItem('address');
      this.userMobile = localStorage.getItem('mobile');
    }
  },
  created() {
    this.setUserData();
  }
};
</script>
