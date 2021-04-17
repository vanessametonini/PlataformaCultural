<template>
  <div
    class="box"
    :style="{ 'background-color' : background }"
  >
    <!-- first -->
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
        @click="showFirstEdit()"
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

        <!-- pin name -->
        <div class="column mg-top16">
          <span class="subheading-2">nome do pin</span>
          <q-input
            v-model="title"
            class="input"
            dense
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- email -->
        <div class="column mg-top8">
          <span class="subheading-2">email</span>
          <q-input
            v-model="email"
            class="input"
            dense
            type="email"
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- phone -->
        <div class="column mg-top8">
          <span class="subheading-2">telefone</span>

          <q-input
            v-model="phone"
            class="input"
            dense
            type="tel"
            mask="(##) ##### - ####"
            unmasked-value
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- address -->
        <div class="column mg-top8">
          <span class="subheading-2">rua - logradouro</span>
          <q-input
            v-model="street"
            class="input"
            dense
            input-class="text-white"
            color="white"
          />
        </div>

        <div class="column mg-top8">
          <span class="subheading-2">bairro</span>
          <q-input
            v-model="neighborhood"
            class="input"
            dense
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- number & cep -->
        <div class="row justify-between mg-top8">
          <div class="column">
            <span class="subheading-2">número</span>

            <q-input
              v-model="number"
              class="input2"
              dense
              :rules="[ val => val.length <= 5 || 'Máximo de 5 caracteres']"
              mask="#####"
              input-class="text-white"
              color="white"
            />
          </div>

          <div class="column">
            <span class="subheading-2">cep</span>

            <q-input
              v-model="cep"
              class="input2"
              dense
              :rules="[ val => val.length <= 8 || 'Máximo de 5 caracteres']"
              mask="##-######"
              unmasked-value
              input-class="text-white"
              color="white"
            />
          </div>
        </div>

        <!-- description -->
        <div class="column mg-top8">
          <span class="subheading-2">descrição</span>

          <q-input
            v-model="description"
            autogrow
            class="f-size"
            dense
            hint="Máximo 2000 caracteres"
            :rules="[ val => val.length <= 2000 || 'Máximo de 2000 caracteres']"
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- links -->
        <div class="column mg-top8">
          <span class="subheading-2">link</span>
          <q-input
            v-model="link"
            class="input f-size"
            dense
            input-class="text-white"
            color="white"
          />
        </div>

        <div class="column mg-top8">
          <span class="subheading-2">facebook</span>
          <q-input
            v-model="face"
            class="input f-size"
            dense
            input-class="text-white"
            color="white"
          />
        </div>

        <div class="column mg-top8">
          <span class="subheading-2">instagram</span>
          <q-input
            v-model="insta"
            class="input f-size"
            dense
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- file picker -->
        <q-file
          v-model="file"
          label="Insira uma imagem"
          :max-file-size="2048"
          counter
          color="white"
          input-class="text-white"
        >
          <template #prepend>
            <!-- <q-icon name="attach_file" /> -->
          </template>
        </q-file>
      </div>

      <!-- actions edit -->
      <div
        class="mg-top32"
        align="right"
      >
        <q-btn
          class="mg-right8"
          flat
          color="white"
          @click="cancelEdit()"
        >
          <span class="caption">Cancelar</span>
        </q-btn>

        <q-btn
          outline
          color="white"
          @click="createPin()"
        >
          <span class="caption">Finalizar</span>
        </q-btn>
      </div>
    </div>

    <!-- ready -->
    <div
      v-if="step==2"
      class="ready"
    >
      <div class="context column">
        <span class="title-1 bolder line-h16"> {{ title }} </span>
        <!-- <span class="body-2 bold mg-n-8"> {{ category.value.toLowerCase() }} </span> -->

        <span class="body-2 bold spaced-32"> {{ description }} </span>

        <div class="row spaced-16">
          <span class="body-2 bold"> {{ street }} - {{ neighborhood }} - {{ number }} </span>
        </div>

        <span class="body-2 bold spaced-16"> {{ phoneMask }} </span>

        <div class="links row mg-top16">
          <a
            class="link caption bold"
            target="blank"
            :href="links.linkF"
          >.facebook</a>
          <a
            class="link caption bold mg-left16"
            target="blank"
            :href="links.linkIG"
          >.instagram</a>
          <a
            class="link caption bold mg-left16"
            target="blank"
            :href="links.otherLink"
          >.link</a>
        </div>
      </div>

      <div class="img-box">
        <q-img
          :src="imgUrl"
          :ratio="16/9"
        />
      </div>

      <div class="action">
        <q-btn
          class="btn-edit"
          flat
          color="white"
          @click="reEdit()"
        >
          <span class="overline bold">editar</span>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>

// import { gsap, TweenMax, Expo } from 'gsap/all';

// gsap.registerPlugin(TweenMax, Expo);

export default {
  name: 'PinProfile',
  components: {
  },
  props: {
    // info: {
    //   type: Object,
    //   default: null,
    // },
    bgColor: {
      type: String,
      default: '#254C26',
    },
  },
  data() {
    return {
      valid: true,
      step: 0,
      lastStep: '',
      active: false,
      background: this.bgColor,
      title: '',
      email: '',
      phone: '',
      street: '',
      neighborhood: '',
      number: '',
      city: '',
      cep: '',
      address: {},
      lat: '',
      long: '',
      description: '',
      // link: '',
      // insta: '',
      // face: '',
      links: {},
      imgUrl: 'https://placeimg.com/500/300/nature',
      file: null,
    };
  },
  computed: {
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
    getKeyUser() {
      const aux = this.$store.getters.currentUser;
      return aux.email;
    },
    getPinStatus() {
      const status = this.$store.state.currentUser.pinCompleted; // verifica se o usuário possui um pin
      return status;
    },
    getStateToken() {
      const tokenStatus = this.$store.state.token;
      if (tokenStatus === null) {
        return false;
      }
      return true;
    },
  },
  created() {
    this.fetchStorage();
  },
  updated() {
    // this.fetcLocalStorage();
  },
  methods: {
    fetchStorage() {
      console.log('pin-profile : fetchStorage');
      if (this.getPinStatus === false) { //  se não existe pin
        console.log('null_Fetch');
        this.title = '';
        this.email = '';
        this.phone = '';
        this.street = '';
        this.number = '';
        this.neighborhood = '';
        this.city = '';
        this.cep = '';
        this.description = '';
        this.link = '';
        this.insta = '';
        this.face = '';
        this.imgUrl = '';
        this.step = 0;
        this.lastStep = 0;
      } else if (this.getPinStatus === true) { // há pin, get myPin na store.
        console.log('state_fetch');
        const info = this.$store.getters.myPin;
        console.log('info', this.$store.getters.myPin);
        this.title = info.title;
        this.email = info.email;
        this.phone = info.phone;
        console.log('number', info.title);
        // this.number = info.address.number;
        // this.street = info.address.street;
        // this.neighborhood = info.address.neighborhood;
        // this.city = info.address.city;
        // this.cep = info.address.cep;
        this.address = info.address;
        this.description = info.description;
        // this.link = info.links.otherLink;
        // this.linkF = info.links.linkF;
        // this.linkIG = info.links.linkIG;
        this.links = info.links;
        this.imgUrl = info.imgUrl;
        this.step = 2;
        this.lastStep = 2;
      }
    },
    fetcLocalStorage() {
      if (this.getPinStatus === true) {
        console.log('localStorage_fetch'); // há pin, get myPin na localStorage
        const info = localStorage.getItem('myPin');
        this.title = info.title;
        this.email = info.email;
        this.phone = info.phone;
        this.street = info.address.street;
        this.number = info.address.number;
        this.neighborhood = info.address.neighborhood;
        this.city = info.address.city;
        this.cep = info.address.cep;
        this.description = info.description;
        this.link = info.links.otherLink;
        this.linkF = info.links.linkF;
        this.linkIG = info.links.linkIG;
        this.imgUrl = info.imgUrl;
        this.step = 2;
        this.lastStep = 2;
      }
    },
    showFirstEdit() {
      if (this.step === 0) {
        this.lastStep = 0;
        this.active = true;
        const a = this;
        setTimeout(() => { a.step = 1; }, 1000);
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
    createPin() {
      console.log('pin-profile:create-pin');
      const payload = {
        userRef: this.getKeyUser,
        title: this.title,
        email: this.email,
        phone: this.phone,
        address: {
          street: this.street,
          neighborhood: this.neighborhood,
          number: this.number,
          city: this.city,
          cep: this.cep,
        },
        coordinates: {
          lat: this.lat,
          long: this.long,
        },
        description: this.description,
        links: {
          linkF: this.face,
          linkIG: this.insta,
          otherLink: this.link,
        },
        imgUrl: this.imgUrl, // fazer post da imagem recuperar url
      };
      this.lastStep = 1;
      this.step = 2;
      // const a = this;
      // setTimeout(() => { a.step = 2; }, 1000);
      this.$store.dispatch({ type: 'addPin', payload });
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


.active {
  animation: expand 1s linear;
}

@keyframes expand {
  0%{
    width: 200px;
    height: 200px;
  }
  50% {
    width: 350px;
  }
  100% {
    width: 350px;
    height: 100%;
  }
}

.first {
  height: 200px;
  width: 200px;
  padding: 16px;
  overflow: hidden;
  position: relative;

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
