<template>

  <div class="box">

    <div class="first" v-if="step==0" :class="{ 'active' : active }">

        <div class="header column">

          <span class="title-1 bolder line-h16">Adicionar Evento</span>

        </div>

        <q-btn flat class="reset-btn btn" ref="btnFirst" @click="createEvent()">
          <span class="body2 bolder">+</span>
        </q-btn>

    </div>

    <div class="create" v-if="step==1" :style="{ 'background-color' : category.color }">

      <div class="input-content">

        <span class="body-2 bolder">Crie seu evento</span>

        <!-- event name -->
        <div class="column mg-top16">
          <span class="subheading-2">nome do evento</span>
          <q-input
            class="input"
            dense
            v-model="name"
            input-class="text-white"
            color="white"/>
        </div>

        <!-- date & time -->
        <div class="row justify-between mg-top8">

          <div class="column">
            <span class="subheading-2">data</span>
            <q-input class="input2" dense v-model="date" mask="##/##/####" input-class="text-white" color="white"/>
          </div>

          <div class="column">
            <span class="subheading-2">hora</span>
            <q-input class="input2" dense v-model="time" mask="##:##" input-class="text-white" color="white"/>
          </div>

        </div>

        <!-- address -->
        <div class="column mg-top8">
          <span class="subheading-2">rua - logradouro</span>
          <q-input class="input" dense v-model="street" input-class="text-white" color="white"/>
        </div>

        <div class="column mg-top8">
          <span class="subheading-2">bairro</span>
          <q-input class="input" dense v-model="neighborhood" input-class="text-white" color="white"/>
        </div>

        <!-- number & cep -->
        <div class="row justify-between mg-top8">

          <div class="column">
            <span class="subheading-2">número</span>
            <q-input class="input2" dense v-model="number" input-class="text-white" color="white"/>
          </div>

          <div class="column">
            <span class="subheading-2">cep</span>
            <q-input class="input2" dense v-model="cep" input-class="text-white" color="white"/>
          </div>

        </div>

        <!-- ticket -->
        <div class="column mg-top8">
          <span class="subheading-2">valor</span>
          <q-input class="input" dense v-model="ticket" mask="r$ ##" input-class="text-white" color="white"/>
        </div>

        <!-- link -->
        <div class="column mg-top8">
          <span class="subheading-2">link do evento</span>
          <q-input class="input" dense v-model="link" input-class="text-white" color="white"/>
        </div>

        <!-- description -->
        <div class="column mg-top8">
          <span class="subheading-2">descrição</span>

          <q-input
            autogrow
            class="f-size"
            dense
            v-model="description"
            hint="Máximo 200 caracteres"
            :rules="[ val => val.length <= 200 || 'Máximo de 2000 caracteres']"
            input-class="text-white"
            color="white"/>

        </div>

        <!-- category -->
        <div class="column mg-top8">
          <span class="subheading-2">categoria</span>

          <q-select
            class="input"
            outlined
            square
            dense
            v-model="category"
            :options="options"
            options-dense
            options-selected-class
            color="white">
            <template v-slot:selected>
              <span class="caption bold">{{ category.label }}</span>
            </template>
          </q-select>

        </div>

        <!-- file picker -->
        <div class="column mg-top8">

          <span class="subheading-2">Insira uma imagem</span>
          <q-file
            class="input"
            dense
            outlined
            square
            use-chips
            v-model="file"
            :max-file-size="2048"
            input-style="{ color: #000 }"
            color="white"
          >
            <!-- <template v-slot:selected-item>
              <span class="caption bold"> {{ file }}</span>
            </template> -->
          </q-file>

        </div>

      </div>

      <!-- actions edit -->
      <div class="mg-top32" align="right">

        <q-btn class="mg-right8" flat color="white" @click="cancelCreate()">
          <span class="caption">Cancelar</span>
        </q-btn>

        <q-btn outline color="white" @click="confirmCreate()">
          <span class="caption">Finalizar</span>
        </q-btn>

      </div>

    </div>

    <div class="ready" v-if="step==2" :style="{ 'background-color' : category.color }">

      <div class="context column">
        <span class="title-1 bolder line-h16"> {{ this.name }} </span>
        <!-- <span class="body-2 bold mg-n-8"> {{ category.value.toLowerCase() }} </span> -->

        <span class="body-2 bold spaced-32"> {{ this.description }} </span>

        <div class="row spaced-16">
          <span class="body-2 bold"> {{ this.street }} - {{ this.neighborhood }} - {{ this.number }} </span>
        </div>

        <span class="body-2 bold spaced-16"> {{ phoneMask }} </span>

        <div class="links row mg-top16">
          <a class="link caption bold" target="blank" :href="this.linkFacebook">.facebook</a>
          <a class="link caption bold mg-left16" target="blank" :href="this.linkInstagram">.instagram</a>
          <a class="link caption bold mg-left16" target="blank" :href="this.linkPagina">.link</a>
        </div>

        <!-- <div class="img-box">
          <q-img :src="imgUrl" :ratio="16/9" placeholder-src="statics/avatar01.jpg"/>
        </div> -->

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

// import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'event-Profile',
  components: {
  },
  data() {
    return {
      valid: false, // confirma se o form de edição é válido (totalmente preenchido)
      active: false, // ativa transitions (mudar essa implementação)
      creating: false,
      editing: false,
      status: [],
      completed: false,
      step: 0,
      lastStep: '',
      eventId: null,
      name: '',
      date: null,
      time: '',
      ticket: '',
      street: '',
      neighborhood: '',
      number: '',
      city: '',
      cep: '',
      description: '',
      category: {
        label: '',
        value: '',
        color: '#b8cad4',
      },
      link: '',
      file: null,
      imgUrl: '',
    };
  },
  props: {
    info: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      options: 'categories/loadCategories',
    }),
    // getUserRef() {
    //   const aux = this.$store.getters.currentUser;
    //   return aux.email;
    // },
  },
  methods: {
    createEvent() { // abre criação do evento
      this.status.push('creating');
      console.log('profile -> addEvent : status', this.status[0]); // emitindo que a box está aberta
      if (this.step === 0) {
        this.lastStep = 0;
        // this.active = true;
        const a = this;
        setTimeout(() => {
          a.step = 1;
          console.log('lastStep - currentStep', this.lastStep, this.step);
        }, 1000);
      }
    },
    cancelCreate() { // cancela criação do evento ou edição de shortEvent
      console.log('cancelar ->', this.lastStep, this.step);
      this.status.slice(0, 1, 'cancel');
      if (this.lastStep === 0) {
        this.status = []; // reseta status
        console.log('-> criação de evento');
        const a = this;
        setTimeout(() => { a.step = 0; }, 1000);
        this.lastStep = 1;
        this.category.color = '#b8cad4'; // resetar bg
      }
      if (this.lastStep === 2) {
        this.status = []; // reseta status
        console.log('-> reedição de shortEvent');
        const a = this;
        setTimeout(() => { a.step = 2; }, 1000);
        this.lastStep = 2;
        this.category.color = '#b8cad4'; // resetar bg
      }
    },
    confirmCreate() { // confirma criação de evento ou ediçao de shortEvent
      this.completed = true;
      this.$store.dispatch('setKey');
      // this.eventId = this.$store.getters.getKey;
      // console.log('getKey', this.eventId);
      console.log('userRef', this.getUserRef);
      const newEvent = {
        // id: this.eventId, // não precisa, o banco cria
        userRef: this.getUserRef,
        name: this.name,
        date: this.date,
        time: this.time,
        street: this.street,
        neighborhood: this.neighborhood,
        number: this.number,
        city: this.city,
        cep: this.cep,
        ticket: this.ticket,
        description: this.description,
        link: this.link,
        category: this.category.value, // from to addEventPost
        bg: this.category.color, // criar função para obter bg, retirar daqui
        imgUrl: this.imgUrl,
      };
      console.log('payload:confirmEdit', newEvent); // log do objeto
      // this.$emit('createEvent', this.newEvent.id); // emit id do evento para o componente myEvents se atualizar
      this.$store.dispatch({ type: 'addEvent', newEvent }); // envia a store a ação add event
      this.resetFields();
      this.lastStep = 1; // seta o lastStep
      const a = this; // armazena escopo
      setTimeout(() => {
        a.step = 0;
      }, 1000); // seta step para modo de adicionar novo evento
    },
    resetFields() {
      this.eventId = null;
      this.name = '';
      this.date = '';
      this.time = '';
      this.ticket = '';
      this.street = '';
      this.neighborhood = '';
      this.number = '';
      this.city = '';
      this.cep = '';
      this.description = '';
      this.category.label = '';
      this.category.value = '';
      this.category.color = '#b8cad4';
      this.link = '';
      this.file = null;
      this.imgUrl = '';
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

.bg-ice {
  background-color: red;
}

.box {
  transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.active {
  // width: 350px;
  // height: 100%;
  // transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
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
  // border: 2px solid white;;
  background-color: #b8cad4;

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

.create, .ready {
  width: 350px;
  height: 100%;
}

.create {
  align-items: center;
  padding: 24px;
  transition: 1s expand linear;
}

.input {
  width: 100%;
  // height: 40px;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 4px;
}

.input2 {
  width: 140px;
  // height: 35px;
  font-size: 1rem;
}

.f-size {
  font-size: 1rem;
}

.ready {
  padding: 32px;
  height: 100%;
  position: relative;

  .context {
    position: relative;
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
