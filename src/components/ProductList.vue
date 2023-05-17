<template>

    <h2 style="margin-left:5rem;">Popular Products</h2>
    <div class="category-search-box">
      <div class="category-box">
        <button @click="filterByCategory('Burgers Meals')" class="category-button">Burgers</button>
        <button @click="filterByCategory('Breakfast')" class="category-button">Breakfast</button>
        <button @click="filterByCategory('Drinks')" class="category-button">Drinks</button>
        <button @click="filterByCategory('Wraps')" class="category-button">Wraps</button>
        <button @click="clearFilters" class="display-all-button">All</button>
      </div>
      <div class="search-box">
        <input type="text" :width="90" v-model="searchTerm" placeholder="Search by name" class="search-input" />
      </div>
    </div>
    <ul class="product-list">
      <li v-for="product in filteredProducts" :key="product.id" class="product-box" style="display:flex; align-items:center; width:90%; margin:20px;">
        <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image" style="width:40%; margin-right:20px;">
        <div style="width:60%;">
          <h3 class="product-name">{{ product.name }} - ${{ product.price }}</h3>
          <button class="product-button">Add to cart</button>
        </div>
      </li>
    </ul>

</template>




<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      selectedCategory: null,
      searchTerm: ''
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get('https://polskoydm.pythonanywhere.com/startup_page')
        .then(response => {
          this.products = response.data.products;
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
    }
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;

      if (this.selectedCategory) {
        filtered = filtered.filter(
          product => product.category === this.selectedCategory
        );
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