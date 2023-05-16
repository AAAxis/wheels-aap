<template>
  <div>
    <h1>Branches</h1>
    <ul>
      <li v-for="branch in branches" :key="branch.id">
        {{ branch.name }} - {{ branch.address }}
      </li>
    </ul>
    <h1>Products</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
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
      branches: [],
      products: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('https://polskoydm.pythonanywhere.com/startup_page')
        .then(response => {
          this.branches = response.data.branches;
          this.products = response.data.products;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
