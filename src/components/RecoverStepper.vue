<template>
  <div class="app-component recover-stepper">
    <!-- header -->
    <div class="stepper-header">
      <progress-bar
        class="progressbar"
        :current-step="currentStep"
        :steps-title="stepsTitle"
      />
      <color-line class="color-line" />
    </div>
    <!-- content -->
    <div class="stepper-content">
      <!-- SECTION 1 - EMAIL FINDER -->
      <section
        v-if="currentStep === 1"
        id="section1"
        class="stepper-section"
      >
        <span class="headline-2 bolder"> Primeiro, vamos localizar sua conta. </span>
        <span class="caption bolder mg-top16"> insira seu email </span>
        <q-input
          v-model="email"
          class="input"
          dense
          square
          filled
          bottom-slots
          :error="$v.email.$error"
          :error-message="emailErrorMessage"
          @blur="$v.email.$touch"
        />
        <div class="recover-status">
          <div class="error"> {{ errorMessage }} </div>
          <div class="loading-spinner">colocar o spinner</div>
        </div>
      </section>
      <!-- SECTION 2 - VERIFY EMAIL -->
      <section
        v-if="currentStep === 2"
        id="section2"
        class="stepper-section"
      >
        <span class="headline-2 bolder">Verifique seu Email!</span>
        <span class="caption bolder mg-top4">Confira também sua caixa de span.</span>
        <span class="caption bolder text-gray mg-top32">Não recebeu o email? clique em voltar</span>
      </section>
    </div>
    <!-- FOOTER -->
    <div class="stepper-footer">
      <!-- CANCEL -->
      <base-button
        v-if="currentStep === 1"
        class="stepper-btn"
        theme="flat"
        @click="cancel()"
      >
        <i class="fas fa-times btn-icon" />
        <span class="body-3 bolder stepper-btn-span text-uppercase mg-left16"> cancelar </span>
      </base-button>
      <base-button
        v-if="currentStep === 1"
        class="stepper-btn"
        :theme="this.$v.email.email && this.$v.email.required ? 'flat' : 'disabled'"
        @click="nextStep()"
      >
        <span class="body-3 bolder stepper-btn-span text-uppercase"> Continuar </span>
        <i class="fas fa-arrow-right btn-icon mg-left16" />
      </base-button>
      <base-button
        v-if="currentStep === numberOfSteps"
        class="stepper-btn"
        :theme="this.$v.email.email && this.$v.email.required ? 'flat' : 'disabled'"
        @click="prevStep()"
      >
        <i class="fas fa-arrow-left btn-icon" />
        <span class="body-3 bolder stepper-btn-span mg-left16"> voltar </span>
      </base-button>
      <base-button
        v-if="currentStep === numberOfSteps"
        class="stepper-btn"
        theme="secondary"
        @click="submit()"
      >
        <!-- <i class="fas fa-plus reply-icon"></i> -->
        <span class="body-3 bolder text-uppercase"> Ir ao Mapa </span>
      </base-button>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators';

import ProgressBar from './BaseStepProgressBar.vue';
import ColorLine from './ColorLine.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'RecoverStepper',
  components: {
    ProgressBar,
    ColorLine,
    BaseButton,
  },
  data() {
    return {
      currentStep: 1,
      count: 0,
      numberOfSteps: 2,
      stepsTitle: ['', ''],
      email: null,
    };
  },
  validations: {
    email: {
      required,
      email,
      maxLength: maxLength(30),
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(15),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  computed: {
    emailErrorMessage() {
      if (!this.$v.email.required) {
        return 'Email é requerido';
      }
      if (!this.$v.email.email) {
        return 'Por favor insira um email válido';
      }
      return '';
    },
  },
  methods: {
    toHome() {
      this.$router.push({ name: 'Home' });
    },
    cancel() {
      this.$router.push({ name: 'SignIn' });
    },
    nextStep() {
      if (this.count <= (this.numberOfSteps)) {
        this.currentStep += 1;
        this.count += 1;
      }
      this.scrollToTop();
    },
    prevStep() {
      if (this.count >= 0) {
        this.currentStep -= 1;
        this.count -= 1;
      }
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
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

.recover-stepper {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  // border: 1px solid #ddd;
}

.stepper-header {
  width: 100%;
  padding: 0px;
  padding-bottom: 0;
  // border-bottom: 1px solid #ddd;

  .progressbar {
    margin-top: 16px;
    // display: none;
  }

  .color-line {
    margin-top: 8px;
  }
}

.stepper-content {
  width: 100%;
  padding: 24px;
  justify-content: flex-start;
  align-items: center;
  // border: 1px solid red;
}

section {
  display: flex;
  flex-flow: column nowrap;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
}

#section1 {
  margin-top: 16px;
}

.recover-status {
  align-self: center;
}

#section2 {
  align-items: center;
  justify-content: center;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.verify-text {
  color: $gray1 !important;
  text-align: center;
}

.input {
  margin-top: 4px;
  margin-bottom: 8px;
}

.stepper-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin: 8px 0;
  padding: 16px 0 0 0;
  padding-bottom: 16px;
  border-top: 1px solid #ddd;
}

.stepper-btn {
  min-width: 120px;
  transition: 1s ease-in-out;
}

.btn-icon {
  color: $gray4;
}

.stepper-btn-span {
  color: $primaryColor !important;
  letter-spacing: 1px;
}

</style>
