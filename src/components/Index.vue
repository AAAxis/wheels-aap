<template>
    <div>

        <div class="cart-summary">
      <h3>Cart Summary</h3>
      <p>Total Items: {{ cartItems.length }}</p>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} - ${{ item.price }} (Quantity: {{ item.quantity }})
        </li>
      </ul>
    </div>

  
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
              <button @click="addToCart(product)" class="product-button">Add to cart</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
<br><br><br><br><br>

    <Footer :cartItems="cartItems" ></Footer>
  </template>

<script>
import { getCookie } from 'vue-cookies';
import Footer from './Footer.vue'; 
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';



export default {
        components: {
        Footer
    },
    created() {
  const email = this.$cookies.get('email');

  if (email) {
    this.$router.push('/dashboard');
  }

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
      swiper: null,
      cartItems: []
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
    },

    addToCart(product) {
      const existingProduct = this.cartItems.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        };

        this.cartItems.push(cartItem);
      }

      console.log('Product added to cart:', product);
    }
  },

  computed: {
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
};
</script>
