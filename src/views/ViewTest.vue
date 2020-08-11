<template>
  <div class="container">
    <div class="fixed-center">
      <recover-stepper />
    </div>
  </div>
</template>

<script>
// import Stepper from '../components/BaseStepper.vue';
import RecoverStepper from '../components/RecoverStepper.vue';

export default {
  name: 'ViewTest',
  components: {
    RecoverStepper,
  },
  data() {
    return {
    };
  },
  computed: {
    getUser() {
      return this.$store.state.currentUser;
    },
    getBg() {
      return this.$store.state.currentUser.category.color;
    },
    getPinUser() {
      return this.$store.state.currentUser.infoPin;
    },
  },
  methods: {
    addCategorie() {
      this.$store.dispatch('addCategorie', {
        name: this.category,
      })
        .then(() => {
          console.log('compTest : add categorie');
        });
    },
  },
};
</script>

<style lang="scss" scoped>

.container {
  width: 100%;
  height: 100vh;
  padding: 32px;
  // background-color: #f5f5f5;
}

.fixed-center {
  position: absolute;
  margin-top: 0px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  // border: 1px solid green;
  width: 700px;
  min-width: 300px;
  // height: 90%;
}

</style>
