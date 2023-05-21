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
      const urlParams = new URLSearchParams(window.location.search);
      email.value = urlParams.get('email');
      image.value = urlParams.get('image');
      username.value = urlParams.get('username');

      // Set the values in local storage
      localStorage.setItem('email', email.value);
      localStorage.setItem('image', image.value);
      localStorage.setItem('username', username.value);

      // Redirect to the dashboard using the router
      router.push({ name: 'Index' });
    });

    return {
      email,
      image,
      username
    };
  }
};

</script>
