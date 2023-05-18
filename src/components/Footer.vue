<template>


    <div class="footer">
      <div class="footer-buttons">
        <a href="/" class="footer-button">
          <i class="fa-solid fa-house fa-lg"></i>
          <span class="footer-button-label">Home</span>
        </a>
        <a href="/user_login" class="footer-button">
          <i class="fa-solid fa-calendar fa-lg"></i>
          <span class="footer-button-label">Saved</span>
        </a>
        <a href="/shopping_cart" class="footer-button">
          <i class="fa-solid fa-cart-shopping fa-lg"></i>
          <span class="footer-button-label">Cart ({{ cartItems.length }})</span>
        </a>
        <a href="/user_login" class="footer-button">
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
  }
};
</script>