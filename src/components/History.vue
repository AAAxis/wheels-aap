<template>
 
    <div class="cart-summary">
  <h3>Cart Summary</h3>
  <p>Total Items: {{ cartItems.length }}</p>
  <ul>
    <li v-for="item in cartItems" :key="item.id">
      {{ item.name }} - ${{ item.price }} (Quantity: {{ item.quantity }})
    </li>
  </ul>
</div>


<Navbar :cartItems="cartItems" />
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
