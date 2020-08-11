<template>
  <div class="app-component progressbar-component">
    <ul class="progressbar">
      <li
        v-for="(item, index) in stepsTitle"
        :id="index + 1"
        :key="index"
        :class="{ 'active': currentStep >= index + 1}"
      >
        <!-- <span> {{ index }} </span> -->
        <span
          :class="{ 'active': currentStep >= index + 1}"
          class="caption bolder"
        > {{ item }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StepProgressBar',
  props: {
    currentStep: {
      type: Number,
      default: 1,
    },
    stepsTitle: {
      type: Array,
      default: () => ['passo 1', 'passo 2', 'passo 3'],
    },
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

$height: 32px;
$width: 32px;
$line-height: 32px;
$primaryColor: black;
$secondaryColor: #ddd;

.progressbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  counter-reset: step;
  // border: 1px solid red;
  margin: 0;
}

.progressbar li {
  list-style-type: none;
  float: left;
  position: relative;
  text-align: center;
  width: 33.33%;
  color: $secondaryColor;
}

.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  height: $height;
  width: $width;
  font-weight: bold;
  line-height: $line-height;
  border: 1px solid $secondaryColor;
  display: block;
  text-align: center;
  margin: 0 auto 8px auto;
  border-radius: 2px;
  background-color: white;
}

span {
  color: #ddd;
}

span.active {
  color: $primaryColor;
  transition: 1s ease-in-out;
}

.progressbar li:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: $secondaryColor;
  top: 16px;
  left: -50%;
  z-index: -1;
}

.progressbar li:first-child:after {
  content: none;
}

.progressbar li.active {
  color: $primaryColor;
  transition: 0.8s ease-in-out;
}

.progressbar li.active:before {
  border-color: $primaryColor;
  transition: 0.6s ease-in-out;
}

.progressbar li.active:after {
  background-color: $primaryColor;
  transition: 0.8s ease-in-out;
}

</style>
