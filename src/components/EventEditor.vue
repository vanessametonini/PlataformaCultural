<template>
  <div class="box">
    <div
      v-if="step==0"
      class="first"
      :class="{ 'active' : active }"
    >
      <div class="header column">
        <span class="title-1 bolder line-h16">Adicionar Evento</span>
      </div>

      <q-btn
        ref="btnFirst"
        flat
        class="reset-btn btn"
        @click="createEvent()"
      >
        <span class="body2 bolder">+</span>
      </q-btn>
    </div>

    <div
      v-if="step==1"
      class="create"
      :style="{ 'background-color' : category.color }"
    >
      <div class="input-content">
        <span class="body-2 bolder">Crie seu evento</span>

        <!-- event name -->
        <div class="column mg-top16">
          <span class="subheading-2">nome do evento</span>
          <q-input
            v-model="name"
            class="input"
            dense
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- date & time -->
        <div class="row justify-between mg-top8">
          <div class="column">
            <span class="subheading-2">data</span>
            <q-input
              v-model="date"
              class="input2"
              dense
              mask="##/##/####"
              input-class="text-white"
              color="white"
            />
          </div>

          <div class="column">
            <span class="subheading-2">hora</span>
            <q-input
              v-model="time"
              class="input2"
              dense
              mask="##:##"
              input-class="text-white"
              color="white"
            />
          </div>
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

        <!-- number & zipcode -->
        <div class="row justify-between mg-top8">
          <div class="column">
            <span class="subheading-2">número</span>
            <q-input
              v-model="number"
              class="input2"
              dense
              input-class="text-white"
              color="white"
            />
          </div>

          <div class="column">
            <span class="subheading-2">zipcode</span>
            <q-input
              v-model="zipcode"
              class="input2"
              dense
              input-class="text-white"
              color="white"
            />
          </div>
        </div>

        <!-- ticket -->
        <div class="column mg-top8">
          <span class="subheading-2">valor</span>
          <q-input
            v-model="ticket"
            class="input"
            dense
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- link -->
        <div class="column mg-top8">
          <span class="subheading-2">link do evento</span>
          <q-input
            v-model="link"
            class="input"
            dense
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- description -->
        <div class="column mg-top8">
          <span class="subheading-2">descrição</span>

          <q-input
            v-model="description"
            autogrow
            class="f-size"
            dense
            hint="Máximo 200 caracteres"
            :rules="[ val => val.length <= 200 || 'Máximo de 2000 caracteres']"
            input-class="text-white"
            color="white"
          />
        </div>

        <!-- category -->
        <div class="column mg-top8">
          <span class="subheading-2">categoria</span>

          <q-select
            v-model="categoryId"
            option-value="id"
            option-label="label"
            map-options
            emit-value
            class="input"
            outlined
            square
            dense
            :options="categories"
            options-dense
            options-selected-class
            color="white"
          >
            <!-- <template #selected>
              <span class="caption bold">{{ category.label }}</span>
            </template> -->
          </q-select>
        </div>

        <!-- file picker -->
        <div class="column mg-top8">
          <span class="subheading-2">Insira uma imagem</span>
          <q-file
            v-model="file"
            class="input"
            dense
            outlined
            square
            use-chips
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
      <div
        class="mg-top32"
        align="right"
      >
        <q-btn
          class="mg-right8"
          flat
          color="white"
          @click="cancelCreate()"
        >
          <span class="caption">Cancelar</span>
        </q-btn>

        <q-btn
          outline
          color="white"
          @click="confirmCreate()"
        >
          <span class="caption">Finalizar</span>
        </q-btn>
      </div>
    </div>

    <div
      v-if="step==2"
      class="ready"
      :style="{ 'background-color' : category.color }"
    >
      <div class="context column">
        <span class="title-1 bolder line-h16"> {{ name }} </span>
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
            :href="linkFacebook"
          >.facebook</a>
          <a
            class="link caption bold mg-left16"
            target="blank"
            :href="linkInstagram"
          >.instagram</a>
          <a
            class="link caption bold mg-left16"
            target="blank"
            :href="linkPagina"
          >.link</a>
        </div>

        <!-- <div class="img-box">
          <q-img :src="imgUrl" :ratio="16/9" placeholder-src="statics/avatar01.jpg"/>
        </div> -->
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

// import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'events/getField',
  mutationType: 'events/updateField',
});

export default {
  name: 'EventProfile',
  components: {
  },
  props: {
    info: {
      type: Object,
      default: null,
    },
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
      category: {
        label: '',
        value: '',
        color: '#b8cad4',
      },
      file: null,
    };
  },
  computed: {
    ...mapFields({
      name: 'eventForm.title',
      date: 'eventForm.date',
      time: 'eventForm.time',
      ticket: 'eventForm.ticket',
      street: 'eventForm.street',
      neighborhood: 'eventForm.neighborhood',
      number: 'eventForm.number',
      city: 'eventForm.city',
      zipcode: 'eventForm.zipcode',
      description: 'eventForm.description',
      link: 'eventForm.link',
      imgUrl: 'eventForm.imgUrl',
      categoryId: 'eventForm.categoryId',
    }),
    ...mapGetters({
      categories: 'categories/loadCategories',
      user: 'users/getCurrentUser',
    }),
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
      this.$store.dispatch('events/createNewEvent');
      // this.completed = true;
      // const newEvent = {
      //   // id: this.eventId, // não precisa, o banco cria
      //   userRef: this.user.id,
      //   name: this.name,
      //   date: this.date,
      //   time: this.time,
      //   street: this.street,
      //   neighborhood: this.neighborhood,
      //   number: this.number,
      //   city: this.city,
      //   zipcode: this.zipcode,
      //   ticket: this.ticket,
      //   description: this.description,
      //   link: this.link,
      //   category: this.category.value, // from to addEventPost
      //   bg: this.category.color, // criar função para obter bg, retirar daqui
      //   imgUrl: this.imgUrl,
      // };
      // console.log('payload:confirmEdit', newEvent); // log do objeto
      // this.$emit('createEvent', this.newEvent.id); // emit id do evento para o componente myEvents se atualizar
      // this.$store.dispatch({ type: 'addEvent', newEvent }); // envia a store a ação add event
      // this.resetFields();
      // this.lastStep = 1; // seta o lastStep
      // const a = this; // armazena escopo
      // setTimeout(() => {
      //   a.step = 0;
      // }, 1000); // seta step para modo de adicionar novo evento
    },
    // resetFields() {
    //   this.eventId = null;
    //   this.name = '';
    //   this.date = '';
    //   this.time = '';
    //   this.ticket = '';
    //   this.street = '';
    //   this.neighborhood = '';
    //   this.number = '';
    //   this.city = '';
    //   this.zipcode = '';
    //   this.description = '';
    //   this.category.label = '';
    //   this.category.value = '';
    //   this.category.color = '#b8cad4';
    //   this.link = '';
    //   this.file = null;
    //   this.imgUrl = '';
    // },
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
