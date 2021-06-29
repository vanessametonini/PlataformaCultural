<template>
  <div class="box">
    <div class="input-content">
      <h4
        v-if="editMode"
        class="title-3 bolder"
      >
        Edite seu pin
      </h4>
      <h4
        v-else
        class="title-3 bolder"
      >
        Adicione um novo pin no mapa
      </h4>
      <!-- pin name -->
      <div class="column mg-top16">
        <span class="subheading-2">Nome do pin*</span>
        <q-input
          v-model="title"
          class="input"
          dense
          input-class="text-black"
          color="black"
          maxlength="90"
          required
          :error="$v.title.$error"
          :error-message="titleErrorMessage"
          @blur="$v.title.$touch"
        />
      </div>

      <!-- category -->
      <div class="column mg-top8">
        <span class="subheading-2">Categoria*</span>
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
          :error="$v.categoryId.$error"
          :error-message="categoryErrorMessage"
          @blur="$v.categoryId.$touch"
          @input="
            category = $store.getters['categories/getCategoryById'](categoryId)
          "
        >
          <template #selected>
            <span class="caption bold">{{ category.label }}</span>
          </template>
        </q-select>
      </div>

      <!-- number & cep -->
      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">CEP*</span>
          <q-input
            v-model="cep"
            class="input"
            dense
            mask="##.###-###"
            unmasked-value
            input-class="text-black"
            color="black"
            :error="$v.cep.$error"
            :error-message="cepErrorMessage"
            @blur="$v.cep.$touch"
            v-on:keyup="searchAddress()"
          />
        </div>

        <div class="column">
          <span class="subheading-2">Número</span>
          <q-input
            ref="inputNumber"
            v-model="number"
            class="input"
            dense
            mask="########"
            input-class="text-black"
            color="black"
            :error="$v.number.$error"
            :error-message="numberErrorMessage"
            @blur="$v.number.$touch"
          />
        </div>
      </div>

      <!-- address -->
      <div class="column mg-top8">
        <span class="subheading-2">Rua - logradouro*</span>
        <q-input
          v-model="street"
          class="input"
          dense
          input-class="text-black"
          color="black"
          :error="$v.street.$error"
          :error-message="streetErrorMessage"
          @blur="$v.street.$touch"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Bairro*</span>
        <q-input
          v-model="neighborhood"
          class="input"
          dense
          input-class="text-black"
          color="black"
          :error="$v.neighborhood.$error"
          :error-message="neighborhoodErrorMessage"
          @blur="$v.neighborhood.$touch"
        />
      </div>

      <!-- description -->
      <div class="column mg-top8">
        <span class="subheading-2">Descrição*</span>
        <q-input
          v-model="description"
          autogrow
          dense
          hint="Máximo 200 caracteres"
          input-class="text-black"
          color="black"
          :rules="[(val) => val.length <= 200 || 'Máximo de 200 caracteres']"
          :error="$v.description.$error"
          :error-message="descriptionErrorMessage"
          @blur="$v.description.$touch"
        />
      </div>

      <!-- email -->
      <div class="column mg-top8">
        <span class="subheading-2">Email</span>
        <q-input
          v-model="email"
          class="input"
          dense
          type="email"
          input-class="text-black"
          color="black"
          :error="$v.email.$error"
          :error-message="emailErrorMessage"
          @blur="$v.email.$touch"
        />
      </div>

      <!-- links -->
      <div class="column mg-top8">
        <span class="subheading-2">Link</span>
        <q-input
          v-model="link"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
          :error-message="linkErrorMessage"
          :error="$v.link.$error"
          @blur="$v.link.$touch"
        />
      </div>

      <!-- phone -->
      <div class="column mg-top8">
        <span class="subheading-2">WhatsApp</span>
        <q-input
          v-model="phone"
          class="input"
          dense
          mask="(##) #### - #####"
          unmasked-value
          color="black"
          :error="$v.phone.$error"
          :error-message="phoneErrorMessage"
          @blur="$v.phone.$touch"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Facebook</span>
        <q-input
          v-model="facebook"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
          :error-message="facebookErrorMessage"
          :error="$v.facebook.$error"
          @blur="$v.facebook.$touch"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Instagram</span>
        <q-input
          v-model="instagram"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
          :error="$v.instagram.$error"
          :error-message="instagramErrorMessage"
          @blur="$v.instagram.$touch"
        />
      </div>

      <div
        v-if="images.length > 0" 
        class="column mg-top8"
      >
        <q-img :src="`${$store.getters['services/getImagePath']}${images[0]}`" />
      </div>

      <!-- file picker -->
      <div class="column mg-top8">
        <span class="subheading-2">Insira uma imagem</span>
        <q-file
          v-model="files"
          class="input"
          dense
          square
          use-chips
          multiple
          :max-files="1"
          accept=".jpg,.jpeg,.png,.gif"
          max-file-size="2097152"
          :error-message="filesErrorMessage"
          :error="$v.files.$error"
          @blur="$v.files.$touch"
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
            Tamanho máximo de 2MB. Formato JPG.
          </template>
        </q-file>
      </div>
    </div>

    <!-- actions edit -->
    <div
      class="mg-top32"
      align="right"
    >
      <q-btn
        v-if="editMode"
        outline
        color="black"
        @click="updatePin()"
      >
        <span class="caption">Atualizar</span>
      </q-btn>
      <q-btn
        v-else
        outline
        color="black"
        @click="confirmCreate()"
      >
        <span class="caption">Cadastrar</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";
import { required, url, minLength, email, numeric } from "vuelidate/lib/validators";
import axios from 'axios';

const { mapFields } = createHelpers({
  getterType: "pins/getField",
  mutationType: "pins/updateField",
});

const cepNotFound = (value, vm) => (value && vm.cepNotFound == false);

export default {
  name: "PinProfile",
  components: {},
  props: {
    item: {
      type: Object,
      default: null,
    },
    fetch: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      waiting: false,
      valid: true,
      active: false,
      files: null,
      file: null,
      cepNotFound: false
    };
  },
  validations: {
    categoryId: {
      required,
    },
    title: {
      required,
    },
    email: {
      email,
    },
    phone: {
      minLength: minLength(11),
    },
    street: {
      required,
    },
    number: {
      numeric
    },
    neighborhood: {
      required,
    },
    city: {},
    cep: {
      required,
      minLength: minLength(8),
      cepNotFound
    },
    description: {
      required,
    },
    link: {
      url,
    },
    facebook: {
      url,
    },
    instagram: {
      url,
    },
    twitter: {
      url,
    },
    whatsapp: {},
    files: {},
  },
  computed: {
    ...mapGetters({
      categories: "categories/loadCategories",
    }),
    ...mapFields({
      category: "categorySelected",
      categoryId: "pinForm.categoryId",
      title: "pinForm.title",
      email: "pinForm.email",
      phone: "pinForm.phone",
      street: "pinForm.street",
      number: "pinForm.number",
      neighborhood: "pinForm.neighborhood",
      city: "pinForm.city",
      cep: "pinForm.zipcode",
      description: "pinForm.description",
      images: "pinForm.imageIds",
      link: "pinForm.link",
      facebook: "pinForm.facebook",
      instagram: "pinForm.instagram",
      twitter: "pinForm.twitter",
      whatsapp: "pinForm.whatsapp",
    }),
    categoryErrorMessage() {
      if (!this.$v.categoryId.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    titleErrorMessage() {
      if (!this.$v.title.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    emailErrorMessage() {
      if (!this.$v.email.email) {
        return "Entre com um email válido";
      }
      return "";
    },
    phoneErrorMessage() {
      if (!this.$v.phone.minLength) {
        return "Entre com um telefone válido";
      }
      return "";
    },
    streetErrorMessage() {
      if (!this.$v.street.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    numberErrorMessage() {
      return "";
    },
    neighborhoodErrorMessage() {
      if (!this.$v.neighborhood.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    cityErrorMessage() {
      if (!this.$v.city.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    cepErrorMessage() {
      if (!this.$v.cep.required) {
        return "Esse campo é obrigatório";
      } else if (!this.$v.cep.minLength) {
        return "Entre com um cep válido";
      } else if (cepNotFound) {
        return "Cep não encontrado"
      }
      return "";
    },
    descriptionErrorMessage() {
      if (!this.$v.description.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    linkErrorMessage() {
      if (!this.$v.link.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    facebookErrorMessage() {
      if (!this.$v.facebook.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    instagramErrorMessage() {
      if (!this.$v.instagram.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    twitterErrorMessage() {
      if (!this.$v.twitter.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    whatsappErrorMessage() {
      return "";
    },
    filesErrorMessage() {
      if (!this.$v.files.required) {
        return "É necessário uma imagem.";
      }
      return "";
    },
    // mascara para telefone
    phoneMask() {
      if (this.phone === null || this.phone === undefined) {
        return false;
      }
      let str = "";
      const p = this.phone;
      const ddd = p.slice(0, 2);
      const prefix = p.slice(2, 7);
      const sufix = p.slice(7, 11);
      str = str.concat(ddd).concat("").concat(prefix).concat(" ").concat(sufix);
      return str;
    },
  },
  created() {
    if(!this.editMode) this.cleanForm();
  },
  methods: {
    sendForm() {
      this.$store.dispatch("pins/postPin", { $router: this.$router })
        .then(()=>{
          this.cleanForm();

          this.$v.$reset()
        });
      this.waiting = false;
    },
    confirmCreate() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        if (this.waiting) {
          this.$q.notify({
            message: "Por favor, aguarde.",
            position: 'top-right',
          });
          return;
        }
        this.waiting = true;

        //se tiver imagens
        if (this.files) {
          this.$store
            .dispatch("images/uploadArray", { files: this.files })
            .then((fileIds) => {
              this.images = fileIds;
              this.sendForm();
            })
            .catch((error) => {
              this.waiting = false;
            });
        }
        //se não tiver imagens
        else {
          this.sendForm();
        }

      } else {
        this.$q.notify({
          message: "Por favor, preencha os campos corretamente.",
          position: 'top-right',
        });
      }
    },
    updateFiles(files) {
      if (Array.isArray(files) === false || files.length === 0) {
        this.files = null;
      }
      else if (Array.isArray(this.files) === true) {
        const diff = this.files.filter((file) => files.indexOf(file) === -1);

        if (diff.length === 1 && this.files.length > 1) {
          this.files = files.slice();
        }
        else if (this.files.length < 3) {
          this.files = diff.concat(files);
        }
      }
      else {
        this.files = files.slice();
      }
    },
    cleanForm() {
      this.category = '';
      this.categoryId = null;
      this.title = '';
      this.email = '';
      this.phone = '';
      this.street = '';
      this.number = '';
      this.neighborhood = '';
      this.city = '';
      this.cep = '';
      this.description = '';
      this.images = [];
      this.link = '';
      this.facebook = '';
      this.instagram = '';
      this.twitter = '';
      this.whatsapp = '';
    },
    updatePin() {
      //se tiver imagens
      if (this.files) {
            this.$store
              .dispatch("images/uploadArray", { files: this.files })
              .then((fileIds) => {
                this.images = fileIds;
                this.$store.dispatch("pins/putPin", { $router: this.$router });
              })
              .catch((error) => {
              this.waiting = false;
            });
      }
      //se não tiver imagens
      else {
            this.$store.dispatch("pins/putPin", { $router: this.$router });
      }
    },

    async searchAddress() {
      var self = this;
      self.cepNotFound = false;
      
      if(/^[0-9]{8}$/.test(this.cep)){

        const addressData = await axios.get(("https://viacep.com.br/ws/" + this.cep + "/json/"))

          if(addressData.data.erro){
            this.$refs.inputNumber.focus();
            self.cepNotFound = true;
            
            self.street = '';
            self.neighborhood = '';
            self.city = '';
            return;
          } 

          self.street = addressData.data.logradouro;
          self.neighborhood = addressData.data.bairro;
          self.city = addressData.data.localidade;
          this.$refs.inputNumber.focus();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

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
