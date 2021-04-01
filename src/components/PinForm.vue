<template>
  <div class="box">
    <div class="input-content">

      <h4 class="title-3 bolder">Edite seu Pin</h4>

      <!-- pin name -->
      <div class="column mg-top16">
        <span class="subheading-2">nome do pin</span>
        <q-input
          v-model="title"
          class="input"
          dense
          input-class="text-black"
          color="black"
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
          input-class="text-black"
          color="black"
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
          input-class="text-black"
          color="black"
        />
      </div>

      <!-- address -->
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

      <!-- number & cep -->
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
            v-model="cep"
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
          class="f-size"
          dense
          hint="Máximo 200 caracteres"
          :rules="[ val => val.length <= 200 || 'Máximo de 200 caracteres']"
          input-class="text-black"
          color="black"
        />
      </div>

      <!-- links -->
      <div class="column mg-top8">
        <span class="subheading-2">link</span>
        <q-input
          v-model="link"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">facebook</span>
        <q-input
          v-model="facebook"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">instagram</span>
        <q-input
          v-model="instagram"
          class="input f-size"
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
          @input="category = $store.getters['categories/getCategoryById'](categoryId); "
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
        @click="cancelEdit()"
      >
        <span class="caption">Cancelar</span>
      </q-btn>

      <q-btn
        outline
        color="black"
        @click="$store.dispatch('pins/postPin', { $router });"
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
    ...mapGetters({
      categories: 'categories/loadCategories',
    }),
    ...mapFields({
      category: 'categorySelected',
      title: 'pinForm.title',
      email: 'pinForm.email',
      phone: 'pinForm.phone',
      street: 'pinForm.street',
      number: 'pinForm.number',
      neighborhood: 'pinForm.neighborhood',
      city: 'pinForm.city',
      cep: 'pinForm.zipcode',
      description: 'pinForm.description',
      image: 'pinForm.image',
      facebook: 'pinForm.facebook',
      instagram: 'pinForm.instagram',
      twitter: 'pinForm.twitter',
      whatsapp: 'pinForm.whatsapp',
      categoryId: 'pinForm.categoryId',
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

.box{
  padding: 16px;
}


.input {
  width: 100%;
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
