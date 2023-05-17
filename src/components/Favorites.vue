<template>

  <div>
 
    <h2 style="margin-left:5rem;" >Favorites near you</h2>
    <div class="swiper-container">
    
      <div class="swiper-wrapper">
        <div v-for="branch in branches" :key="branch.id" class="swiper-slide">
          <div class="gallery-cell">
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
  </div>

</template>

<script>
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  data() {
    return {
      branches: [],
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
      axios.get('https://polskoydm.pythonanywhere.com/startup_page')
        .then(response => {
          this.branches = response.data.branches;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getImageUrl(image) {
      return `https://polskoydm.pythonanywhere.com/static/uploads/${image}`;
    },
    initializeSwiper() {
  this.swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true, // Enable looping
    navigation: {
      nextEl: null,
      prevEl: null
    }
  });
}
  }
};
</script>

<style>
.swiper-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.swiper-wrapper {
  display: flex;
}

.swiper-slide {
  margin-right: 10px;
}

.gallery-cell {
  margin-right: 10px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card a {
  text-decoration: none;
}

.card-img-top {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 18px;
  margin-bottom: 5px;
}

p {
  margin: 0;
}
</style>
