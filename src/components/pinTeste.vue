<template>

  <div class="box" :style="{ 'background-color' : background }" :class="{ 'active' : active}">

    <!-- <div class="show-steps"> {{ this.step }} - {{ this.lastStep }} </div> -->

    <!-- first -->
    <div class="first" v-if="step==0">

        <div class="header column">

          <span class="title-1 bolder line-h16">Adicionar Pin</span>

        </div>

        <q-btn flat class="reset-btn btn" ref="btnFirst" @click="showFirstEdit()">
          <span class="body2 bolder">+</span>
        </q-btn>

    </div>

    <!-- edit mode -->
    <div class="edit" v-if="step==1">

      <div class="input-content">

        <span class="body-2 bolder">Edite seu Pin</span>

        <!-- pin title -->
        <div class="column mg-top16">
          <!-- <span class="subheading-2">nome do pin</span> -->
          <q-input
            class="input"
            v-model="title"
            label="nome do pin"
            label-color="white"
            input-class="text-white"
            color="white"/>
        </div>

        <!-- email -->
        <div class="column mg-top8">
          <!-- <span class="subheading-2">email</span> -->
          <q-input
            class="input"
            v-model="email"
            type="email"
            label="email"
            label-color="white"
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- phone -->
        <div class="column mg-top8">
          <!-- <span class="subheading-2">telefone</span> -->

          <q-input
            class="input"
            v-model="phone"
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
          <!-- <span class="subheading-2">rua - logradouro</span> -->

          <q-input
            class="input"
            v-model="street"
            label="rua - logradouro"
            label-color="white"
            input-class="text-white"
            color="white"
          />

        </div>

        <!-- neighborhood -->
        <div class="column mg-top8">
          <!-- <span class="subheading-2">bairro</span> -->

          <q-input
            class="input"
            v-model="neighborhood"
            label="bairro"
            label-color="white"
            input-class="text-white"
            color="white"
          />

        </div>

        <!-- number & cep -->
        <div class="row justify-between mg-top8">

          <div class="column">
            <!-- <span class="subheading-2">número</span> -->

            <q-input
              class="input2"
              v-model="number"
              :rules="[ val => val.length <= 5 || 'Máximo de 5 caracteres']"
              mask="#####"
              label="número"
              label-color="white"
              input-class="text-white"
              color="white"
            />

          </div>

          <div class="column">
            <!-- <span class="subheading-2">cep</span> -->

            <q-input
              class="input2"
              v-model="cep"
              :rules="[ val => val.length <= 8 || 'Máximo de 8 caracteres']"
              mask="#####-###"
              label="cep"
              label-color="white"
              input-class="text-white"
              color="white"
            />

          </div>

        </div>

        <!-- description -->
        <div class="column">
          <!-- <span class="subheading-2">descrição</span> -->

          <q-input
            autogrow
            class="f-size"
            v-model="description"
            hint="Máximo 2000 caracteres"
            :rules="[ val => val.length <= 2000 || 'Máximo de 2000 caracteres']"
            label="descrição"
            label-color="white"
            input-class="text-white"
            color="white"/>

        </div>

        <!-- link -->
        <div class="column mg-top8">
          <!-- <span class="subheading-2">link</span> -->

          <q-input
            class="input f-size"
            v-model="otherLink"
            label="link"
            label-color="white"
            input-class="text-white"
            color="white"
          />

        </div>

        <!-- facebook -->
        <div class="column mg-top8">
          <!-- <span class="subheading-2">facebook</span> -->

          <q-input
            class="input f-size"
            v-model="linkF"
            label="facebook"
            label-color="white"
            input-class="text-white"
            color="white"
          />

        </div>

        <!-- instagram -->
        <div class="column mg-top8">
          <!-- <span class="subheading-2">instagram</span> -->

          <q-input
            class="input f-size"
            v-model="linkIG"
            label="instagram"
            label-color="white"
            input-class="text-white"
            color="white"
          />

        </div>

        <!-- file picker -->
        <q-file
          v-model="file"
          :max-file-size="2048"
          counter
          outlined
          square
          class="mg-top16"
          color="white"
          label="Insira uma imagem"
          label-color="white"
          input-class="text-white"
        >
          <!-- <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template> -->
        </q-file>

      </div>

      <!-- actions edit -->
      <div class="mg-top32" align="right">

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
          @click="createPin()"
        >
          <span class="caption">Finalizar</span>
        </q-btn>

      </div>

    </div>

    <!-- ready -->
    <div class="ready" v-if="step==2">

      <div class="context column">
        <span class="title-1 bolder line-h16"> {{ this.item.title }} </span>
        <!-- <span class="body-2 bold mg-n-8"> {{ category.value.toLowerCase() }} </span> -->

        <span class="body-2 bold spaced-32"> {{ this.item.description }} </span>

        <div class="row spaced-16">
          <span class="body-2 bold"> {{ this.itme.street }} - {{ this.item.neighborhood }} - {{ this.item.number }} </span>
        </div>

        <span class="body-2 bold spaced-16"> {{ this.item.phone }} </span>

        <div class="links row mg-top16">
          <a class="link caption bold" target="blank" :href="this.item.linkF">.facebook</a>
          <a class="link caption bold mg-left16" target="blank" :href="this.item.linkIG">.instagram</a>
          <a class="link caption bold mg-left16" target="blank" :href="this.item.otherLink">.link</a>
        </div>

      </div>

      <div class="img-box">
        <q-img :src="this.item.imgUrl" :ratio="16/9" />
      </div>

      <div class="action">
        <q-btn class="btn-edit" flat color="white" @click="reEdit()">
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
  name: 'pin-Profile',
  components: {
  },
  data() {
    return {
      valid: true,
      step: 0,
      lastStep: 0,
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
      description: '',
      linkF: '',
      linkIG: '',
      otherLink: '',
      imgUrl: 'https://placeimg.com/500/300/nature',
      file: null,
    };
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
  created() {
    this.fetchData();
  },
  computed: {
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
    // recupera referencia a usuário ( email )
    getUserId() {
      const aux = this.$store.getters.currentUser.id;
      return aux;
    },
    getUserCategory() {
      const aux = this.$store.getters.currentUser.categoryId;
      return aux;
    },
  },
  methods: {
    fetchData() {
      if (this.fetch === false) { //  se não existe pin
        console.log('null_Fetch');
        this.file = null;
        this.step = 0;
        this.lastStep = 0;
      } else if (this.fetch === true) { // há pin, get myPin na store.
        console.log('state_fetch');
        const info = this.$store.getters.myPin;
        console.log('myPin from store', this.$store.getters.myPin);
        this.title = info.title;
        this.email = info.email;
        this.phone = info.phone;
        // this.number = info.address.number;
        // this.street = info.address.street;
        // this.neighborhood = info.address.neighborhood;
        // this.city = info.address.city;
        // this.cep = info.address.cep;
        this.address = info.address;
        this.description = info.description;
        this.link = info.otherLink;
        this.linkF = info.linkF;
        this.linkIG = info.linkIG;
        // this.links = info.links;
        this.imgUrl = info.imgUrl;
        this.file = null;
        this.step = 2;
        this.lastStep = 2;
      }
    },
    showFirstEdit() {
      if (this.step === 0) {
        this.lastStep = 0;
        this.active = true;
        const a = this;
        setTimeout(() => { a.step = 1; }, 800);
        console.log('iniciando primeira edição', this.lastStep, this.step);
      }
    },
    reEdit() {
      this.fetchStorage();
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
    createPin() {
      console.log('pin-profile:create-pin');
      const payload = {
        // userRef: this.getUserRef,
        userId: this.getUserId, // id do usuário juliana
        category: this.getUserCategory,
        title: this.title,
        email: this.email,
        phone: this.phone,
        street: this.street,
        neighborhood: this.neighborhood,
        number: this.number,
        city: this.city,
        cep: this.cep,
        description: this.description,
        linkF: this.linkF,
        linkIG: this.linkIg,
        otherLink: this.otherLink,
        imgUrl: this.imgUrl, // fazer post da imagem recuperar url
      };
      // console.log(payload);
      Promise((resolve, reject) => {
        this.$store.dispatch('addPin', payload)
          .then((response) => {
            console.log(response);
            this.lastStep = 1;
            const a = this;
            setTimeout(() => { a.step = 2; }, 1000);
            this.fetchData();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
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
