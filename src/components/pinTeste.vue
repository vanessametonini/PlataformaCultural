<template>
  <div
    class="box"
    :style="{ 'background-color' : background }"
    :class="{ 'active' : active}"
  >
    <div
      v-if="step==0"
      class="first"
    >
      <div class="header column">
        <span class="title-1 bolder line-h16">Adicionar Pin</span>
      </div>

      <q-btn
        ref="btnFirst"
        flat
        class="reset-btn btn"
        @click="showForm()"
      >
        <span class="body2 bolder">+</span>
      </q-btn>
    </div>

    <!-- edit mode -->
    <div
      v-if="step==1"
      class="edit"
    >
      <div class="input-content">
        <span class="body-2 bolder">Edite seu Pin</span>
        <!-- pin title -->
        <div class="column mg-top16">
          <q-input
            v-model="title"
            class="input"
            label="nome do pin"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- email -->
        <div class="column mg-top8">
          <q-input
            v-model="email"
            class="input"
            type="email"
            label="email"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- phone -->
        <div class="column mg-top8">
          <q-input
            v-model="phone"
            class="input"
            type="tel"
            mask="(##) ####-####"
            label="telefone"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- street -->
        <div class="column mg-top8">
          <q-input
            v-model="street"
            class="input"
            label="rua - logradouro"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- neighborhood -->
        <div class="column mg-top8">
          <q-input
            v-model="neighborhood"
            class="input"
            label="bairro"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- number & zipcode -->
        <div class="row justify-between mg-top8">
          <div class="column">
            <q-input
              v-model="number"
              class="input2"
              :rules="[ val => val.length <= 5 || 'Máximo de 5 caracteres']"
              mask="#####"
              label="número"
              label-color="white"
              input-class="text-white"
              color="white"
            />
          </div>
          <div class="column">
            <q-input
              v-model="zipcode"
              class="input2"
              :rules="[ val => val.length <= 9 || 'Máximo de 8 caracteres']"
              mask="#####-###"
              label="zipcode"
              label-color="white"
              input-class="text-white"
              color="white"
            />
          </div>
        </div>
        <!-- description -->
        <div class="column">
          <q-input
            v-model="description"
            autogrow
            class="f-size"
            hint="Máximo 2000 caracteres"
            :rules="[ val => val.length <= 2000 || 'Máximo de 2000 caracteres']"
            label="descrição"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- facebook -->
        <div class="column mg-top8">
          <q-input
            v-model="facebook"
            class="input f-size"
            label="facebook"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- instagram -->
        <div class="column mg-top8">
          <q-input
            v-model="instagram"
            class="input f-size"
            label="instagram"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- twitter -->
        <div class="column mg-top8">
          <q-input
            v-model="twitter"
            class="input f-size"
            label="twitter"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- whatsapp -->
        <div class="column mg-top8">
          <q-input
            v-model="whatsapp"
            class="input f-size"
            label="whatsapp"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>
        <!-- file picker -->
        <q-file
          :max-file-size="2048"
          counter
          outlined
          square
          class="mg-top16"
          color="white"
          label="Insira uma imagem"
          label-color="white"
          input-class="text-white"
        />
      </div>

      <!-- actions edit -->
      <div
        class="mg-top32"
        align="right"
      >
        <q-btn
          class="reset-btn btn mg-right8"
          flat
          color="white"
          @click="cancelEdit()"
        >
          <span class="caption">Cancelar</span>
        </q-btn>

        <q-btn
          class="reset-btn primary-action"
          flat
          color="white"
          @click="$store.dispatch('pins/updateMyPin')"
        >
          <span class="caption">Finalizar</span>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>

import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'pins/getField',
  mutationType: 'pins/updateField',
});

export default {
  name: 'PinProfile',
  components: {
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
    fetch: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: '#254C26',
    },
  },
  data() {
    return {
      valid: true,
      step: 0,
      lastStep: 0,
      active: false,
      background: this.bgColor,
      file: null,
    };
  },
  computed: {
    ...mapFields({
      title: 'currentPin.title',
      email: 'currentPin.email',
      phone: 'currentPin.phone',
      street: 'currentPin.street',
      number: 'currentPin.number',
      neighborhood: 'currentPin.neighborhood',
      city: 'currentPin.city',
      zipcode: 'currentPin.zipcode',
      description: 'currentPin.description',
      image: 'currentPin.image',
      facebook: 'currentPin.facebook',
      instagram: 'currentPin.instagram',
      twitter: 'currentPin.twitter',
      whatsapp: 'currentPin.whatsapp',
    }),
    // mascara para telefone
    phoneMask() {
      if (this.phone === null || this.phone === undefined) {
        console.log('phone undefined');
        return false;
      }
      let str = '';
      const p = this.phone;
      console.log('p', this.phone);
      const ddd = p.slice(0, 2);
      const prefix = p.slice(2, 7);
      const sufix = p.slice(7, 11);
      str = str.concat(ddd).concat('').concat(prefix).concat(' ')
        .concat(sufix);
      console.log(str);
      return str;
    },
  },
  created() {},
  methods: {
    showForm() {
      if (this.step === 0) {
        this.lastStep = 0;
        this.active = true;
        const a = this;
        setTimeout(() => { a.step = 1; }, 800);
        console.log('iniciando primeira edição', this.lastStep, this.step);
      }
    },
    reEdit() {
      this.lastStep = 2;
      const a = this;
      setTimeout(() => { a.step = 1; }, 1000);
      console.log('reeditando', this.lastStep, this.step);
    },
    cancelEdit() {
      console.log('cancelando', this.lastStep, this.step);
      if (this.lastStep === 0) {
        this.active = false;
        const a = this;
        setTimeout(() => { a.step = 0; }, 1000);
        this.lastStep = 1;
        console.log('cancelando primeira edição', this.lastStep);
      }
      if (this.lastStep === 2) {
        const a = this;
        setTimeout(() => { a.step = 2; }, 1000);
        console.log('cancelando reedição');
        this.lastStep = 2;
      }
    },
    expand() {
      this.state = !this.state;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  font-family: 'Helvetica';
}

.show-steps {
  position: relative;
  top: 16px;
  left: 16px;
  height: 16px;
  width: 32px;
  background-color: white;
  color: red;
  font-size: 1rem;
}

.box {
  transition: 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.active {
  animation: expand .8s linear;
}

@keyframes expand {
  0%{
    width: 200px;
    height: 200px;
  }
  100% {
    width: 350px;
    height: 100%;
  }
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.editMode {
  height: 100%;
  width: 350px !important;
  animation: 1.2s fadeInOpacity ease-in;
}

.first {
  height: 200px;
  width: 200px;
  padding: 16px;
  overflow: hidden;
  position: relative;
  // border: 2px solid white;;

  .header {
    align-self: center;
    position: relative;
  }

  .btn {
    height: 40px;
    width: 40px;
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
}

.edit, .ready {
  width: 350px;
  height: 100%;
}

.edit {
  align-items: center;
  padding: 24px;
}

.input {
  width: 100%;
  // height: 40px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: -8px;
}

.input2 {
  width: 140px;
  // height: 35px;
  font-size: 1.2rem;
}

.f-size {
  font-size: 0.9rem;
}

// .edit {
//   background-color: #E6B545;
// }

.ready {
  height: 100%;
  position: relative;

  .context {
    position: relative;
    padding: 32px;
  }

  .action {
    position: absolute;
    top: 16px;
    right: 16px;

    .btn-edit {
      height: 30px;
      width: 60px;
      border-radius: 0px;
    }
  }
}

.link {
  text-decoration: none;
  color: white;
}

.img-box {
  width: 100%;
}

.roll-out {
  animation: roll-out 1.5s linear;
}

.roll-in {
  animation: roll-out 1s linear reverse;
}

@keyframes roll-out {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.6);
  }
  100% {
    transform: scale(0.6);
  }
}

span {
  color: white;
}

</style>
