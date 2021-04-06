<template>
  <div class="box">
    <div class="input-content">
      <h4 class="title-3 bolder">Crie seu evento</h4>
      <!-- event name -->
      <div class="column mg-top16">
        <span class="subheading-2">nome do evento</span>
        <q-input
          v-model="name"
          class="input"
          dense
          input-class="text-black"
          color="black"
        />
      </div>

      <!-- date & time -->
      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">data</span>
          <q-input
            v-model="date"
            class="input"
            dense
            mask="##/##/####"
            input-class="text-black"
            color="black"
          />
        </div>

        <div class="column">
          <span class="subheading-2">hora</span>
          <q-input
            v-model="time"
            class="input"
            dense
            mask="##:##"
            input-class="text-black"
            color="black"
          />
        </div>
      </div>

      <!-- address -->
      <div class="column mg-top8">
        <span class="subheading-2">local do evento</span>
        <q-input
          v-model="site"
          class="input"
          dense
          input-class="text-black"
          color="black"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">rua - logradouro</span>
        <q-input
          v-model="street"
          class="input"
          dense
          input-class="text-black"
          color="black"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">bairro</span>
        <q-input
          v-model="neighborhood"
          class="input"
          dense
          input-class="text-black"
          color="black"
        />
      </div>

      <!-- number & zipcode -->
      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">número</span>
          <q-input
            v-model="number"
            class="input"
            dense
            :rules="[ val => val.length <= 5 || 'Máximo de 5 caracteres']"
            mask="#####"
            input-class="text-black"
            color="black"
          />
        </div>

        <div class="column">
          <span class="subheading-2">cep</span>
          <q-input
            v-model="zipcode"
            class="input"
            dense
            :rules="[ val => val.length <= 8 || 'Máximo de 5 caracteres']"
            mask="##-######"
            unmasked-value
            input-class="text-black"
            color="black"
          />
        </div>
      </div>

     
      <!-- description -->
      <div class="column mg-top8">
        <span class="subheading-2">descrição</span>
        <q-input
          v-model="description"
          autogrow
          dense
          hint="Máximo 200 caracteres"
          :rules="[ val => val.length <= 200 || 'Máximo de 200 caracteres']"
          input-class="text-black"
          color="black"
        />
      </div>

      <!-- ticket -->
      <div class="column mg-top8">
        <span class="subheading-2">valor</span>
        <q-input
          v-model="ticket"
          class="input"
          dense
          input-class="text-black"
          color="black"
        />
      </div>

      <!-- link -->
      <div class="column mg-top8">
        <span class="subheading-2">link do evento</span>
        <q-input
          v-model="link"
          class="input"
          dense
          input-class="text-black"
          color="black"
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
          square
          dense
          :options="categories"
          options-dense
          options-selected-class
          color="black"
          @input="category = $store.getters['categories/getCategoryById'](categoryId)"
        >
          <template #selected>
            <span class="caption bold">{{ category.label }}</span>
          </template>
        </q-select>
      </div>

      <!-- file picker -->
      <div class="column mg-top8">
        <span class="subheading-2">Insira uma imagem</span>
        <q-file
          :value="files"
          class="input"
          dense
          square
          counter
          use-chips
          multiple
          max-files="3"
          @input="updateFiles"
        >
          <template #append>
            <q-icon
              v-if="files !== null"
              name="close"
              class="cursor-pointer"
              @click.stop="files = null"
            />
            <q-icon
              name="create_new_folder"
              @click.stop
            />
          </template>
          <template #hint>
            Tamanho máximo de 5MB
          </template>
          <!-- <template #after>
            <q-btn
              round
              dense
              flat
              icon="send"
              @click="sendImages"
            />
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
        color="black"
        @click="cancelCreate()"
      >
        <span class="caption">Cancelar</span>
      </q-btn>

      <q-btn
        outline
        color="black"
        @click="confirmCreate()"
      >
        <span class="caption">Finalizar</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      files: null,
      file: null,
    };
  },
  computed: {
    ...mapFields({
      name: 'eventForm.title',
      date: 'eventForm.date',
      time: 'eventForm.time',
      ticket: 'eventForm.ticket',
      site: 'eventForm.site',
      street: 'eventForm.street',
      neighborhood: 'eventForm.neighborhood',
      number: 'eventForm.number',
      city: 'eventForm.city',
      zipcode: 'eventForm.zipcode',
      description: 'eventForm.description',
      link: 'eventForm.link',
      imgUrl: 'eventForm.imgUrl',
      categoryId: 'eventForm.categoryId',
      images: 'eventForm.imageIds',
      category: 'categorySelected'
    }),
    ...mapGetters({
      categories: 'categories/loadCategories',
      user: 'users/getCurrentUser',
    }),
  },
  methods: {
    updateFiles(files) {
      if (Array.isArray(files) === false || files.length === 0) {
        this.files = null
      }
      else if (Array.isArray(this.files) === true) {
        const diff = this.files.filter(file => files.indexOf(file) === -1)
        
        if (diff.length === 1 && this.files.length > 1) {
          this.files = files.slice()
        }
        else {
          this.files = diff.concat(files)
        }
      }
      else {
        this.files = files.slice()
      }
    },
    cancelCreate() { // cancela criação do evento ou edição de shortEvent
      this.category = {
        label: '',
        value: '',
        color: '#b8cad4',
      }
      
    },
    confirmCreate() { // confirma criação de evento ou ediçao de shortEvent
      this.$store.dispatch('images/uploadArray', { files: this.files })
        .then((fileIds) => {
          this.images = fileIds;
          this.$store.dispatch('events/createNewEvent');
          this.$router.push({ name: 'Schedule' });
        })
        .catch ((error) => {
            console.log(error);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';


.box {
  padding: 16px;
}

.input {
  width: 100%;
  // height: 40px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: -8px;
}

.f-size {
  font-size: 0.9rem;
}

span {
  color: black;
}

.row.justify-between .column {
  width: 48%;
}

</style>
