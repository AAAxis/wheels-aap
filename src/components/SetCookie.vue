<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const image = ref('');
    const username = ref('');

    const router = useRouter(); // Access the router object

    onMounted(() => {
      const emailCookie = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('email='));

      if (!emailCookie) {
        const urlParams = new URLSearchParams(window.location.search);
        email.value = urlParams.get('email');
        image.value = urlParams.get('image');
        username.value = urlParams.get('username');

        // Set the cookies with a long expiration date
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        document.cookie = `email=${encodeURIComponent(email.value)}; expires=${oneYearFromNow.toUTCString()}`;
        document.cookie = `image=${encodeURIComponent(image.value)}; expires=${oneYearFromNow.toUTCString()}`;
        document.cookie = `username=${encodeURIComponent(username.value)}; expires=${oneYearFromNow.toUTCString()}`;

        // Redirect to the dashboard using the router
        router.push({ name: 'Index' });
      }
    });

    return {
      email,
      image,
      username
    };
  }
};

</script>
