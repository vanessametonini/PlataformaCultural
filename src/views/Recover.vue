<template>
  <div class="app-page recover-page">
    <logo-card
      :black-mode="true"
      class="identity"
    />

    <div class="recover-content">
      <recover-stepper />
    </div>
  </div>
</template>

<script>
import RecoverStepper from '../components/RecoverStepper.vue';

export default {
  name: 'RecoverPage',
  components: {
    RecoverStepper,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.recover-page {
  background-color: white;
  border: 2px solid pink;
  padding: 24px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-content: center;
}

.identity {
  // position: absolute;
  // top: 24px;
  // left: 24px;
}

.recover-content {
  align-self: center;
  margin-top: -64px;
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 2px;
}

</style>
