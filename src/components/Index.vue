<template>
    <div>
        <div class="topnav" id="myTopnav">

  
  <button @click="filterByCategory('Burgers Meals')" class="category-button">Burgers</button>
  <button @click="filterByCategory('Breakfast')" class="category-button">Breakfast</button>
  <button @click="filterByCategory('Drinks')" class="category-button">Drinks</button>
  <button @click="filterByCategory('Wraps')" class="category-button">Wraps</button>
  <button @click="clearFilters" class="display-all-button">All</button>
  
 
</div>
      <h2 style="margin-left: 5rem;">Favorites near you</h2>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="branch in branches" :key="branch.id" class="swiper-slide">
            <div class="gallery-cell">
              <div class="card">
                <a :href="`/${branch.token}/shop`">
                  <img :src="getImageUrl(branch.file)" :alt="branch.name"  class="card-img-top">
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
        <li v-for="product in filteredProducts" :key="product.id" class="product-box" style="display:flex; align-items:center; width:80%; margin:5px;">
          <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image" style="width:40%; margin-right:20px;">
          <div style="width:60%;">
            <h3 class="product-name">{{ product.name }} - ${{ product.price }}</h3>
            <button class="product-button">Add to cart</button>
          </div>
        </li>
      </ul>
  
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swiper from 'swiper';
  import 'swiper/swiper-bundle.css';
  
  export default {
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
      filteredProducts() {
        let filtered = this.products;
  
        if (this.selectedCategory) {
          filtered = filtered.filter(product => product.category === this.selectedCategory);
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
  