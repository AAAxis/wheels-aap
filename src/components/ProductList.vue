<template>



 
 
      <button @click="filterByCategory('Burgers Meals')" class="category-button">Burgers Meal</button>
        <button @click="filterByCategory('Breakfast')" class="category-button">Breakfast</button>
        <button @click="filterByCategory('Drinks')" class="category-button">Hot Drinks</button>
        <button @click="filterByCategory('Wraps')" class="category-button">Wraps</button>
        <button @click="clearFilters" class="display-all-button">Show All</button>
  

<input type="text" style="width: 87%;" v-model="searchTerm" placeholder="Search by name" class="search-input" />
 
      <h2 style="margin-left:5rem;">Popular Products</h2>
    <ul class="product-list">
      <li v-for="product in filteredProducts" :key="product.id" class="product-box" style="display:flex; align-items:center; width:80%; margin:5px;">
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