<template>
    <div id="app">
      <Favorites :rows="rows" />
      <ProductList :products="filteredProducts" />
      <Footer />
    </div>
  </template>
  <script>
  import ProductList from './ProductList.vue';
  import Footer from './Footer.vue';
  import Favorites from './Favorites.vue';



export default {
  components: {
    ProductList,
    Footer,
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