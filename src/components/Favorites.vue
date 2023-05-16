<template>
  <div>
    <h1>Branches</h1>
    <ul>
      <li v-for="branch in branches" :key="branch.id">
        {{ branch.name }} - {{ branch.address }}
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
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
