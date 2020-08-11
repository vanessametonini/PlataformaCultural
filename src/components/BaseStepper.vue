<template>
  <div class="app-component stepper">
    <div class="stepper-header">
      <progress-bar
        :current-step="currentStep"
        :steps-title="stepsTitle"
      />
    </div>
    <div
      v-for="item in numberOfSteps"
      :id="item"
      :key="item"
      class="stepper-content"
      :style="{ 'display': currentStep !== item ? 'none' : 'block'}"
    >
      <slot
        :v-slot="`slot${item}`"
      />
    </div>
    <div class="stepper-footer">
      <base-button
        v-if="currentStep != 1"
        class="stepper-btn"
        theme="flat"
        @click="prevStep()"
      >
        <!-- <i class="fas fa-plus reply-icon"></i> -->
        <span class="body-2 bolder stepper-btn-span"> prev </span>
      </base-button>
      <base-button
        v-if="currentStep != numberOfSteps"
        class="stepper-btn"
        theme="flat"
        @click="nextStep()"
      >
        <!-- <i class="fas fa-plus reply-icon"></i> -->
        <span class="body-2 bolder stepper-btn-span"> next </span>
      </base-button>
      <base-button
        v-if="currentStep === numberOfSteps"
        class="stepper-btn"
        theme="secondary"
        @click="finish()"
      >
        <!-- <i class="fas fa-plus reply-icon"></i> -->
        <span class="body-2 bolder"> finish </span>
      </base-button>
    </div>
  </div>
</template>

<script>
import ProgressBar from './BaseStepProgressBar.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'Stepper',
  components: {
    ProgressBar,
    BaseButton,
  },
  props: {
    numberOfSteps: {
      type: Number,
      default: 1,
    },
    stepsTitle: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentStep: 1,
      lastStep: 0,
      count: 0,
    };
  },
  methods: {
    nextStep() {
      if (this.count <= (this.numberOfSteps)) {
        this.currentStep += 1;
        this.count += 1;
      }
    },
    prevStep() {
      if (this.count >= 0) {
        this.currentStep -= 1;
        this.count -= 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

$height: 32px;
$width: 32px;
$line-height: 32px;
$primaryColor: green;
$secondaryColor: #ddd;

.stepper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  border: 1px solid #ddd;
}

.stepper-header {
  width: 100%;
  border-bottom: 1px solid #ddd;
}

.stepper-content {
  width: 100%;
  height: 100%;
  padding: 8px;
}

.stepper-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  border: 1px solid #ddd;
}

.stepper-btn {
  width: 120px;
  transition: 1s ease-in-out;
}

.stepper-btn-span {
  color: $primaryColor !important;
  letter-spacing: 1px;
}

</style>
