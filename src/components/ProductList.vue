<template>
  <div>
    <h1>Products</h1>
    <div>
      <input type="text" v-model="searchTerm" placeholder="Search by name" />
      <button @click="filterByCategory('Burgers Meals')">Burgers Meals</button>
      <button @click="filterByCategory('Breakfast')">Breakfast</button>
      <button @click="filterByCategory('Drinks')">Drinks</button>
      <button @click="filterByCategory('Wraps')">Wraps</button>
      <button @click="clearFilters">Display All</button>
    </div>
    <ul>
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
  </div>
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
