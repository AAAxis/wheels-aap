<template>


    <div class="footer">
      <div class="footer-buttons">
        <a href="/" class="footer-button">
          <i class="fa-solid fa-house fa-lg"></i>
          <span class="footer-button-label">Home</span>
        </a>
        <a href="https://polskoydm.pythonanywhere.com/user_register" class="footer-button">
          <i class="fa-solid fa-calendar fa-lg"></i>
          <span class="footer-button-label">Saved</span>
        </a>
        <a href="https://polskoydm.pythonanywhere.com/user_register" class="footer-button">
          <i class="fa-solid fa-cart-shopping fa-lg"></i>
          <span class="footer-button-label">Cart</span>
          <span class="cart-counter">{{ cartItems.length }}</span>
        </a>
        <a onclick="openNav()" class="footer-button">
          <i class="fa-solid fa-user fa-lg"></i>
          <span class="footer-button-label">Profile</span>
        </a>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },
};
</script>