<template>
  <div class="app-page">
    <div class="create-topic-content">
      <topic-creator />
    </div>
  </div>
</template>

<script>
// import Stepper from '../components/BaseStepper.vue';
import TopicCreator from '../components/TopicCreator.vue';

export default {
  name: 'CreateTopic',
  components: {
    TopicCreator,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>

.app-page {
  width: 100%;
  height: 100vh;
  padding: 32px;
  // background-color: #f5f5f5;
}

.create-topic-content {
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
