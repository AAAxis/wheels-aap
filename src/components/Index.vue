<template>
  <div>
    <div v-if="hasEmailCookie">
      <!-- HTML code to show when the "email" cookie exists -->
      <Navbar></Navbar>
      <!-- Other content for authenticated users -->
    </div>
    <div v-else>
      <!-- HTML code to show when the "email" cookie doesn't exist -->

      <div>
<div>
  <div class="topnav" id="myTopnav">
    <button @click="filterByCategory('burgers')" class="category-button">Burgers</button>
    <button @click="filterByCategory('breakfast')" class="category-button">Breakfast</button>
    <button @click="filterByCategory('drinks')" class="category-button">Drinks</button>
    <button @click="filterByCategory('wraps')" class="category-button">Wraps</button>
    <button @click="clearFilters" class="display-all-button">Show All</button>
  </div>

  <h2 style="margin-left: 5rem;">Favorites near you</h2>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="branch in branches" :key="branch.id" class="swiper-slide">
        <div style="height: 300px;" class="gallery-cell">
          <div class="card">
            <a :href="`/${branch.token}/shop`">
              <img :src="getImageUrl(branch.file)" :alt="branch.name" class="card-img-top">
            </a>
            <div class="card-body">
              <h4 class="card-title">{{ branch.name }}</h4>
              <p>20 min Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="search-container">
    <input type="text" v-model="searchTerm" placeholder="Search by name" class="search-input" />
    <button class="search-button">
      <i class="fas fa-search"></i>
    </button>
  </div>

  <h2 style="margin-left: 5rem;">Popular Products</h2>
  <ul class="product-list">
    <li v-for="product in filteredProducts" :key="product.id" class="product-box" style="display:flex; align-items:center; width:90%; margin:5px;">
      <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image" style="width:40%; margin-right:20px;">
      <div style="width:60%;">
        <h3 class="product-name">{{ product.name }} - ${{ product.price }}</h3>
        <button class="product-button">
<a style="text-decoration: none;" href="https://polskoydm.pythonanywhere.com/user_login">Add to cart</a>
</button>
      </div>
    </li>
  </ul>
</div>
</div>
<br><br><br><br><br>


<div class="footer">
<div class="footer-buttons">
  <a href="https://polskoydm.pythonanywhere.com/user_login" class="footer-button">
  <i class="fa-solid fa-user fa-lg"></i>
  <span class="footer-button-label">Profile</span>
</a>
<a href="/" class="footer-button">
  <i class="fa-solid fa-house fa-lg"></i>
  <span class="footer-button-label">Home</span>
</a>

<a href="https://polskoydm.pythonanywhere.com/user_login" class="footer-button">
  <i class="fa-solid fa-history fa-lg"></i>
  <span class="footer-button-label">Orders</span>
</a>
<a href="https://polskoydm.pythonanywhere.com/user_login" class="footer-button">
  <i class="fa-solid fa-cart-shopping fa-lg"></i>
  <span class="footer-button-label">Cart</span>
</a>

</div>
</div>
      <!-- Other content for non-authenticated users -->
    </div>

    <!-- Rest of the template -->
  </div>
</template>
<script>
import Navbar from './Navbar.vue';
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Navbar
  },

  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      products: [],
      branches: [],
      selectedCategory: null,
      searchTerm: '',
      swiper: null
    };
  },

  mounted() {
    this.fetchData();
    this.initializeSwiper();
  },

  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
    }
  },

  methods: {
    fetchData() {
      axios
        .get('https://polskoydm.pythonanywhere.com/startup_page')
        .then(response => {
          this.products = response.data.products;
          this.branches = response.data.branches;
        })
        .catch(error => {
          console.error(error);
        });
    },

    filterByCategory(category) {
      this.selectedCategory = category;
    },

    clearFilters() {
      this.selectedCategory = null;
      this.searchTerm = '';
    },

    getImageUrl(image) {
      return `https://polskoydm.pythonanywhere.com/static/uploads/${image}`;
    },

    initializeSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: null,
          prevEl: null
        }
      });
    }
  },

  computed: {
    hasEmailCookie() {
      // Check if the "email" value exists in local storage
      return localStorage.getItem('email') !== null;
    },

    filteredProducts() {
      let filtered = this.products;

      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category == this.selectedCategory);
      }

      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchTermLower)
        );
      }

      return filtered;
    }
  }
}
</script>
