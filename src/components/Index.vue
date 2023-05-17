<template>
    <div id="app">
      <Favorites :rows="rows" />
      <ProductList :products="filteredProducts" />
    </div>
  </template>
  <script>
  import ProductList from './ProductList.vue';
  import Favorites from './Favorites.vue';



export default {
  components: {
    ProductList,
    Favorites
  },
  data() {
    return {
      rows: [], // Add your data for the 'rows' prop if needed
    };
  },
  computed: {
    filteredProducts() {
      // Implement your logic to filter products here
      return []; // Return the filtered products
    },
  },
};
</script>